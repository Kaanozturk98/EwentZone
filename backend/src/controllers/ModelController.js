const {
  check_if_number,
  prettify_dates,
  validate_query,
  error_handler,
  sanitize_content,
} = require("../helpers");
const _ = require("underscore");
const { ObjectId } = require("bson");

const list_fn = async (Model, params) => {
  // Define GET query parameters.
  let {
    lookups = [],
    middlewareFunc,
    processData,
    sortOrder = "desc",
    sortBy = "updatedAt",
    contains,
    baseUrl,
    sort = false,
    sanitizeContent = false,
    exclude = [],
    include = [],
    pageNumber = 1,
    perPage = 20,
    paginateSubFields,
    textSearchField,
    res,
    ...restParams
  } = params;
  let beginTime = new Date();
  const maxPerPage = 100;
  // Create object for sorting here since we can't directly put variables into key-value pairs.
  let sortPipeline = {};
  // Create an another pipeline for the preparation of advanced sort needs.
  // sortPreparationPipeline can be easily expanded by adding new if conditions to support new advanced sort needs we might encounter in the future.
  let sortPreparationPipeline = [];
  if (sortBy.includes("length")) {
    const field2SortByLength = sortBy.slice(0, sortBy.lastIndexOf("."));
    sortPreparationPipeline.push({
      $addFields: {
        arrayLengthCount: {
          $size: { $ifNull: [`$${field2SortByLength}`, []] },
        },
      },
    });
    sortPipeline["arrayLengthCount"] = sortOrder == "desc" ? -1 : 1;
  } else {
    sortPipeline[sortBy] = sortOrder == "desc" ? -1 : 1;
  }
  sortPipeline._id = sortOrder == "desc" ? -1 : 1;

  let excludePipeline = exclude.reduce((prev, curr) => {
    prev[curr] = 0;
    return prev;
  }, {});
  let includePipeline = include.reduce((prev, curr) => {
    prev[curr] = 1;
    return prev;
  }, {});

  // Create an Object to hold identifying query parameter's details. This is used
  // when user makes a request to get an object or objects using some identifier.
  // e.g. One Object --> /services?slug={slug}
  // e.g. Mulitple Objects --> /services?live_status=live
  let find = {};
  // For every field in the Model's schema
  Object.entries(Model.schema.paths).map(([k, v]) => {
    // If current field is one of the types below
    if (["String", "ObjectID", "Integer", "Boolean"].includes(v.instance)) {
      // and it also exists in the query..
      if (restParams[k]) {
        // get that query param's value
        let value = decodeURIComponent(String(restParams[k])).trim();
        // The reason there is a check for valid ObjectID here is that,
        // every referenced field is stored with its ObjectID in another model
        // e.g. For SubCategory model, company field's value would be an ObjectID
        // But another querying parameter for front-end is using the slug parameter.
        // So we want to check if slug is given instead of objectID, then this slug
        // will be used to find objectId for that field.
        if (ObjectId.isValid(value) && String(new ObjectId(value)) === value) {
          find[k] = { value, field: "_id", type: "reference" };
        } else if (v.instance == "ObjectID") {
          find[k] = { value, field: "slug", type: "reference" };
        } else if (v.instance == "Boolean") {
          let bool = value === "true";
          find[k] = { value: bool, type: "field" };
        } else {
          find[k] = { value, type: "field" };
        }
      }
    }
  });

  // Adding support for including array values
  for (const field in includePipeline) {
    const embedded = field.split(".");
    const key = embedded.slice(0, -1).join("");
    if (Model.schema.paths[key]?.instance === "Array" && embedded.length > 1) {
      const index = parseInt(embedded.slice(-1)[0]);
      if (_.isNumber(index))
        includePipeline[key] = { $arrayElemAt: [`$${key}`, index] };
      includePipeline = _.omit(includePipeline, field);
    }
  }

  let projectionPipeline = { ...excludePipeline, ...includePipeline };

  // If slug is given instead of ObjectID for a referenced field, find it first using the slug.
  // Remember, before we created a find variable which will hold details to give this function.
  let validated_query = await validate_query(find, Model);

  // This array is the actual query, that choses some documents based on conditions
  // like match, contains, search etc.
  let limitingQuery = {
    $match: {
      ...validated_query,
    },
  };

  if (contains) {
    limitingQuery["$match"][textSearchField || "name"] = {
      $regex: contains,
      $options: "i",
    };
  }

  // Construct 'pagination' here to decide the lookup strategy, because sometimes user might
  // include a field on sortBy or in filters that will be added by a lookup. So we need
  // to make lookups first.
  let pagination = [
    { $skip: pageNumber > 0 ? (pageNumber - 1) * perPage : 0 },
    { $limit: perPage },
  ];

  const packaged_variables = {
    validated_query,
    limitingQuery,
    sortPreparationPipeline,
    sortPipeline,
    projectionPipeline,
    pagination,
    lookups,
  };
  // This variable makes use of native aggregate([match,group])
  // instead of countDocuments operator since countDocuments only allows
  // $match usage for the query, but sometimes $project or $set is
  // used in queries to filter based on derived fields.
  let customCountQuery = false;
  // apply middlewares
  if (middlewareFunc) {
    await middlewareFunc(packaged_variables);
    // This part might also include projection stages
    // since some match queries may depend on derivated attributes
    if (_.isArray(packaged_variables.limitingQuery))
      limitingQuery = [limitingQuery, ...packaged_variables.limitingQuery];
    else
      limitingQuery = {
        $match: {
          ...limitingQuery.$match,
          ...packaged_variables.limitingQuery.$match,
        },
      };
    customCountQuery = packaged_variables.customCountQuery;
    sortPreparationPipeline = packaged_variables.sortPreparationPipeline;
    sortPipeline = packaged_variables.sortPipeline;
    projectionPipeline = packaged_variables.projectionPipeline;
    pagination = packaged_variables.pagination;
    lookups = packaged_variables.lookups;
  }

  // Construct limiting query here, because it may be
  // an array of objects.
  if (_.isObject(limitingQuery) && !_.isArray(limitingQuery)) {
    // If it's an object make sure we have non-null values inside all the keys,
    let filteredLimitingQuery = _.pick(
      limitingQuery,
      (val, key, obj) => Object.keys(val).length > 0
    );
    // remove the ones with null values
    limitingQuery = [];
    if (Object.keys(filteredLimitingQuery).length > 0)
      limitingQuery = [filteredLimitingQuery];
  }

  // Check if lookup is necessary for any field that's given in the request,
  // e.g. sortBy can be equal ro "reviews" so we need to lookup reviews first
  // before we can sort.

  // This can only happen when we dont have any related field for a lookup on
  // our collection and a field will be added after the lookup. Like getting review counts
  // for Services or Getting Service counts for Sub Categories.
  let lookupBeforeSort = false;
  let lookupBeforeProject = false;
  // Also, sometimes we may be include a field generated by a lookup based on other fields,
  // That happened when creating leaderboards with sorting. When I tried to include services
  // field only, lookup errored out since it depends on other fields, because we project only
  // the services field before lookups, causing other fields to disappear. To prevent this
  // I created this includeProjectionLast boolean which takes place when LookupFirst is false
  // since if the lookups are first then we have all the fields generated so projection can be done
  // however needed. But if we're trying to receive only one field that'll be generated by lookups,
  // projection should take place at the end of the pipeline.
  let includeProjectionLast = false;
  // Validate lookup to see if any field inside the lookups has been excluded in the request params.
  // CODE SNIPPET BELOW CAN BE DONE MUCH BETTER.
  let validated_lookups = lookups.filter((l) => {
    const lookup = l["$lookup"]?.as;
    console.log("lookup", lookup, "sortBy", sortBy, "eq", lookup === sortBy);
    const unwind = l["$unwind"]?.path || l["$unwind"];
    if (!(lookup || unwind)) {
      return true;
    }
    if (lookup && lookup === sortBy) {
      lookupBeforeSort = true;
    }
    const value = lookup || unwind.replace("$", "");
    if (Object.keys(excludePipeline).length > 0) {
      return !Object.keys(projectionPipeline).includes(value);
    } else if (Object.keys(includePipeline).length > 0) {
      lookupBeforeProject = true;
      return Object.keys(projectionPipeline).includes(value);
    }
    return true;
  });

  // Construct the last pipeline
  let pipeline = [...limitingQuery];
  if (lookupBeforeSort) {
    pipeline = [
      ...pipeline,
      ...validated_lookups,
      ...sortPreparationPipeline,
      !sort ? { $sort: sortPipeline } : {},
      Object.keys(projectionPipeline).length > 0
        ? {
            $project: { ...projectionPipeline },
          }
        : {},
    ];
  } else if (lookupBeforeProject) {
    pipeline = [
      ...pipeline,
      ...sortPreparationPipeline,
      !sort ? { $sort: sortPipeline } : {},
      ...validated_lookups,
      Object.keys(projectionPipeline).length > 0
        ? {
            $project: { ...projectionPipeline },
          }
        : {},
    ];
  } else {
    pipeline = [
      ...pipeline,
      ...sortPreparationPipeline,
      !sort ? { $sort: sortPipeline } : {},
      Object.keys(projectionPipeline).length > 0
        ? {
            $project: { ...projectionPipeline },
          }
        : {},
      ...validated_lookups,
    ];
  }

  const hasLimitingQuery = !_.isEmpty(limitingQuery);

  // return count of all documents if no query specified
  const countFn = hasLimitingQuery
    ? customCountQuery
      ? Model.aggregate([
          ...limitingQuery,
          { $group: { _id: null, n: { $sum: 1 } } },
        ])
      : Model.countDocuments(limitingQuery[0]["$match"])
    : Model.estimatedDocumentCount();
  // return aggregation
  return Promise.all([
    Model.aggregate([
      ...pipeline.filter((v) => v && Object.keys(v).length > 0),
      ...pagination.filter((v) => v && Object.keys(v).length > 0),
    ]).allowDiskUse(true),
    countFn,
  ])
    .then(async (response) => {
      const docs = response[0] || [];
      const count = response[1];
      let endTime = new Date();
      const lastPage = parseInt((count - 1) / perPage + 1);
      let result = {
        docs,
        meta: {
          count: customCountQuery ? (count[0]?.n ? count[0].n : 0) : count,
          queryTime: `${String(endTime - beginTime)} ms`,
          pageNumber,
          perPage,
          lastPage: pageNumber === lastPage,
        },
      };
      if (docs.length) {
        result.docs = prettify_dates(result.docs);
      }
      if (processData) result = await processData(result);
      return result;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(error_handler(err));
    });
};

/*
 *
 *
 * @param {Mongoose.Model} Model
 *
 * @param {Array} lookups: Set of lookups before returning multiple documents
 * @param	{Function} preprocess_func: Pre-processing function to take place on singular document responses.
 * @param {Array} aggregation_filters: Set of additional aggregation filters to apply before returning multiple documents.
 * }
 *
 * A wrapper function to apply as a Router Middleware with Express.
 * Takes a Model as parameter and wraps its GET method with pagination.
 */

const LIST = (Model, { lookups, middlewareFunc, processData } = {}) => {
  const maxPerPage = 100;
  return async function (req, res, next) {
    const user = req.user;
    // Below code snippet is used when we need control over lookups to see
    // if the request is sent from public or dashboard.
    const publicSession = typeof user === "object" ? false : true;
    const sortOrder = req.query.sortOrder || "desc";
    const sortBy = req.query.sortBy || "updatedAt";
    const contains = req.query.contains;
    const baseUrl = req.baseUrl;
    // will be defualted to yes, if false is given it will be true
    const sort = req.query.sort === "false";
    const sanitizeContent = req.query.sanitizeContent === "true";
    const textSearchField = req.query.textSearchField;
    const exclude = (req.query.exclude && req.query.exclude.split(",")) || [];
    const include = (req.query.include && req.query.include.split(",")) || [];
    let pageNumber = req.query.pageNumber || 1;
    let perPage = req.query.perPage || 20;
    let paginateSubFields = req.query.paginateSubFields;
    // Create object for sorting here since we can't directly put variables into key-value pairs.
    let sortPipeline = {};
    sortPipeline[sortBy] = sortOrder == "desc" ? -1 : 1;
    sortPipeline._id = sortOrder == "desc" ? -1 : 1;
    // Create exclude and include pipelines which will act as project operators in aggregation pipeline.
    let excludePipeline = exclude.reduce((prev, curr) => {
      prev[curr] = 0;
      return prev;
    }, {});
    let includePipeline = include.reduce((prev, curr) => {
      prev[curr] = 1;
      return prev;
    }, {});

    // Check if include & exclude given in the query at the same time.
    if (
      Object.keys(excludePipeline).length > 0 &&
      Object.keys(includePipeline).length > 0
    ) {
      return res.status(400).json({
        message: "You can not exclude and include fields at the same time.",
      });
    }

    // Validate the query parameters by checking if they're numbers.
    if (!check_if_number(pageNumber) || !check_if_number(perPage)) {
      return res.status(500).json({ message: "Wrong query parameters" });
    }
    // Convert values to integers after checking if they can be converted.
    perPage = parseInt(perPage);
    pageNumber = parseInt(pageNumber);
    // Check if number parameters are positive
    if (perPage > maxPerPage || perPage < 1 || pageNumber < 1) {
      return res.status(500).json({ message: "Wrong query parameters." });
    }
    const response = await list_fn(Model, {
      ...req.query,
      lookups: typeof lookups === "function" ? lookups(publicSession) : lookups,
      processData,
      res,
      middlewareFunc,
      sortOrder,
      sortBy,
      contains,
      baseUrl,
      sort,
      sanitizeContent,
      textSearchField,
      exclude,
      include,
      pageNumber,
      perPage,
      paginateSubFields,
    });
    if (response)
      return res
        .status(200)
        .json({ ...response, meta: { ...response.meta, publicSession } });
  };
};

/**
 * A wrapper function to apply as a Router Middleware with Express.
 * Takes a Mongoose Model as a parameter and wraps it with a Create
 * operation using Mongoose
 *
 * @param {Mongoose.Model} Model
 */

const UPDATE = (Model) => {
  return async function (req, res, next) {
    const bulkUpdate = req.body._ids ? true : false;
    const advancedUpdate = req.query.advancedUpdate;
    if (advancedUpdate) {
      var query = { _id: req.query._id };
      let data = {};
      let promise;
      let promises = [];
      // TODO: CONVERT TO BULKWRITE
      Object.keys(req.body).forEach((key) => {
        if (!!Object.keys(req.body[key]).length) {
          data = {
            [`$${key}`]: req.body[key],
          };
          promise = Model.findByIdAndUpdate(query, data);
          promises.push(promise);
        }
      });

      Promise.all(promises)
        .then((resp) => {
          return res.status(200).json(resp);
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json(error_handler(err));
        });
    } else if (bulkUpdate) {
      let promises = [];
      const data = req.body.updateData;
      // TODO: CONVERT TO BULKWRITE
      req.body._ids.forEach((id) => {
        const promise = Model.findByIdAndUpdate(id, data);
        promises.push(promise);
      });
      Promise.all(promises)
        .then((resp) => {
          return res.status(200).json(resp);
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json(error_handler(err));
        });
    } else {
      let id = req.query._id ? req.query._id : "";
      if (id) {
        var query = { _id: req.query._id },
          data = req.body,
          options = {
            context: "query",
            runValidators: true,
          };
        return Model.findByIdAndUpdate(query, data, options)
          .then((resp) => {
            return res.status(200).json(resp);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json(error_handler(err));
          });
      }
    }
  };
};

/**
 * A wrapper function to apply as a Router Middleware with Express.
 * Takes a Mongoose Model as a parameter and wraps it with a Create
 * operation using Mongoose
 *
 * @param {Mongoose.Model} Model
 */
const CREATE = (Model) => {
  return async function async(req, res, next) {
    const newObject = new Model(req.body);
    return newObject
      .save()
      .then((resp) => {
        return res.status(200).json(resp);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json(error_handler(err));
      });
  };
};

/**
 * A wrapper function to apply as a Router Middleware with Express.
 * Takes a Mongoose Model as a parameter and wraps it with a Delete
 * operation using Mongoose. Should be used with POST Method as this
 * function receives a body of IDs to delete.
 *
 * @param {Mongoose.Model} Model
 */
const DELETE = (Model) => {
  return async function (req, res, next) {
    const { _ids = [], conditional } = req.body || {};
    if (_ids.length < 1 && !conditional) {
      return res
        .status(500)
        .json({ message: "Please provide item ids to delete" });
    }
    // We also want to allow conditional deletes here,
    // e.g. { service:{service_id}, name: {bla} }
    if (conditional) {
      return Model.deleteMany(conditional)
        .exec()
        .then((r) => {
          return res
            .status(200)
            .json({ message: "Objects deleted successfully." });
        })
        .catch((err) => {
          return res.status(500).json(error_handler(err));
        });
    }
    let docs = await Model.find({ _id: { $in: _ids } }).exec();
    return Promise.all(
      docs.map((doc) => {
        return doc.deleteOne();
      })
    )
      .then((r) => {
        return res
          .status(200)
          .json({ message: "Objects deleted successfully." });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json(error_handler(err));
      });
  };
};

/**
 * A wrapper function to apply .distinct() function over a given field for a given Model.
 * This is designed to give out unique values in a field for a collection.
 */

const DISTINCT = (Model) => {
  return async function (req, res, next) {
    const field = req.query.field;
    if (!field) {
      return res.status(400).json({ message: "Field parameter is required." });
    }
    return Model.find()
      .distinct(field)
      .exec()
      .then((results) => {
        return res.status(200).json(results);
      })
      .catch((err) => {
        return res.status(500).json(error_handler(err));
      });
  };
};

module.exports = {
  LIST,
  CREATE,
  UPDATE,
  DELETE,
  DISTINCT,
  list_fn,
};
