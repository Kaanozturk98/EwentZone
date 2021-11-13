const moment = require("moment");
const mongoose = require("mongoose");
const axios = require("axios");
const _ = require("underscore");
const WorkshopModel = require("../models/Workshops");
const multerS3 = require("multer-s3");
const multer = require("multer");
const AWS = require("aws-sdk");
const request = require("request-promise");
const s3 = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET_NAME } });

/**
 * Takes a parameter, tries to convert to Integer
 */
exports.check_if_number = (num) => {
  return parseInt(num) ? true : false;
};

exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 *
 * @param {Error} err
 * Handles error objects and prettifies.
 */
exports.error_handler = (err) => {
  return {
    message: err.message,
    name: err.name,
    type: typeof err,
  };
};

/**
 * Prettify dates before giving them out using momentjs
 */
exports.prettify_dates = (data) => {
  const convert = (v) => {
    if (_.isDate(v)) {
      return moment(v).format("lll");
    }
    return v;
  };
  if (_.isArray(data)) {
    return _.map(data, (object) => {
      return _.mapObject(object, (val, key) => {
        return convert(val);
      });
    });
  } else if (_.isObject(data)) {
    return _.mapObject(data, (val, key) => {
      return convert(val);
    });
  }
};

/**
 *
 * When we pass slug value instead of ObjectID for a referenced field on findOne queries,
 * This function would take the unstructure query object and validates it.
 * Looks for the referenced fields in the query and finds the ID for those Model Objects using slug
 * parameter.
 */
exports.validate_query = async (query, Model) => {
  const fields_to_models = {
    WorkshopModel,
  };
  return new Promise(async (res, rej) => {
    try {
      let validated_query = {};
      let pairs = Object.entries(query);
      if (pairs.length > 0) {
        for (i = 0; i < pairs.length; i++) {
          console.log("i", i);
          const [k, v] = pairs[i];
          validated_query[k] = v.value;
          if (v.type === "reference" && v.field == "slug") {
            let mdl = await fields_to_models[k]
              .findOne({ slug: v.value }, { _id: 1 })
              .exec();
            if (mdl) {
              validated_query[k] = mongoose.Types.ObjectId(mdl._id);
            }
          }
          if (v.type === "reference" && v.field == "_id") {
            validated_query[k] = mongoose.Types.ObjectId(v.value);
          }
        }
      }
      return res(validated_query);
    } catch (error) {
      throw new Error(error);
    }
  });
};

exports.validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.s3_uploader_multer = (dir) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `${dir}${file.originalname}`);
      },
    }),
  });
};

/**
 *
 * Helper function to download image from given link, then upload to S3
 * without saving.
 * @param {String} file_name Full file name including the directories to upload the image.
 * @param {String} uri URI for the icon.
 */
exports.s3_upload_image = async function (file_name, uri) {
  const buf = await axios.get(uri);
  return new Promise((resolve, reject) => {
    var data = {
      Key: file_name,
      Body: buf.data,
    };
    s3.putObject(data, function (err, data) {
      if (err) {
        console.log(err);
        return reject(err);
        console.log("Error uploading data: ", data);
      } else {
        return resolve(data);
        console.log("successfully uploaded the image!");
      }
    });
  });
};

exports.s3_uploader_image = async function (file_name, uri) {
  const options = {
    uri: uri,
    encoding: null,
  };
  const body = await request(options);
  return s3
    .upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file_name,
      Body: body,
    })
    .promise();
};
