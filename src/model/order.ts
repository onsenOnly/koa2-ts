import { Schema, Model, model, Document } from "mongoose";

export interface OrderDocument extends Document {
    user: string;
    type: string;
    status: number;
}

const OrderSchema: Schema = new Schema({
    user: { type: String, require: true },
    price: { type: String, required: true },
    type: { type: String, required: true, default: 1 }
});

export const OrderModel: Model<OrderDocument> = model("Order", OrderSchema);