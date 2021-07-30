import mongoose, { Document, Model } from "mongoose";

export interface ICourseNote extends Document {
  title: string;
  notes: Array<string>;
}

export interface ICourseNoteDocument extends ICourseNote, Document {}

export interface ICourseNoteModel extends Model<ICourseNoteDocument> {}
