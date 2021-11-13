import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface Workshop {
  name: string;
  slug: string;
  city: string;
  price: number;
  rating: number;
}

const WorkshopsSchema = new Schema<Workshop>({
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

const WorkshopModel = model<Workshop>("Workshop", WorkshopsSchema);
export default WorkshopModel;
