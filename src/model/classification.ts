import { Schema, Model, model, Document } from "mongoose";

export interface ClassificationDocument extends Document {
    name: string;
    url: string;
    status: number;
    createTime: Date;
    updateTime: Date;
}

const ClassificationSchema: Schema = new Schema({
    name: { type: String, require: true, index: true, unique: true },
    url: { type: String },
    status: { type: String, default: 1 },
    createTime: { type: Date, default: new Date(), index: true },
    updateTime: { type: Date, index: true }
});

export const ClassificationModel: Model<ClassificationDocument> = model("Classification", ClassificationSchema);