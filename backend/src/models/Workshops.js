const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const WorkshopsSchema = new Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    required: true,
    default: function () {
      return this.name.replace(/\s/g, "-").toLocaleLowerCase("en-US");
    },
    unique: true,
  },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

module.exports = WorkshopModel = model("Workshop", WorkshopsSchema);
