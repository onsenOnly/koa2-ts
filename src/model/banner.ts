import { Schema, Model, model, Document } from "mongoose";

export interface BannerDocument extends Document {
    url: string;
    name: string;
    status: number;
    updateTime: Date;
    type: number;
}

const BannerSchema: Schema = new Schema({
    url: { type: String, require: true, index: true },
    name: { type: String, required: true, index: true },
    status: { type: Number, default: 1 },
    updateTime: { type: Date, default: new Date() }
});

export const BannerModel: Model<BannerDocument> = model("Banner", BannerSchema);