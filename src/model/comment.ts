import { Schema, Model, model, Document } from "mongoose";

export interface ClassificationDocument extends Document {
    commentUser: string;
    status: number;
    createTime: Date;
}

const ClassificationSchema: Schema = new Schema({
    commentUser: { type: Schema.Types.ObjectId, ref: "User", require: true, index: true },
    status: { type: String, default: 1 },
    createTime: { type: Date, default: new Date(), index: true },
    // replyList:{type:}
});

export const ClassificationModel: Model<ClassificationDocument> = model("Article", ClassificationSchema);