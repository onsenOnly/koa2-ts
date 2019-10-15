import { Schema, Model, model, Document } from "mongoose";

export interface PersonDocument extends Document {
    state: string;
    jumpList: Array<object>;
    linkAddress: string;
    linkPhone: string;
    updateTime: Date;
}

const personSchema: Schema = new Schema({
    state: { type: String},
    jumpList: { type: Number, default: 1 },
    linkAddress: {type: String},
    linkPhone: {type: String},
    updateTime: { type: Date, default: new Date()}
});

export const personModel: Model<PersonDocument> = model("Banner", personSchema);