import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPublic: {type: Boolean, default:false},
    slug: {type: String, sparse:true}
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
