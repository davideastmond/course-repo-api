import mongoose, { Document, Model } from "mongoose";

export interface ICourseNote extends Document {
  learningBlurb: string;
  takeAways: { [keyof: string]: string };
}

export interface ICourseNoteDocument extends ICourseNote, Document {}

export interface ICourseNoteModel extends Model<ICourseNoteDocument> {}
