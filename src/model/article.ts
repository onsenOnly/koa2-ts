import { Schema, Model, model, Document } from "mongoose";

export interface ArticleDocument extends Document {
    title: string;
    titleMap: string;
    status: number;
    abstract: string;
    content: string;
    classification: Schema.Types.ObjectId;
    releaseTime: Date;
    updateTime: Date;
    Commentator: [Schema.Types.ObjectId];
    view: number;
    like: number;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, require: true, index: true }, // 标题
    titleMap: { type: String }, // 导航图
    status: { type: Number, default: 2 }, // 状态 1发布2保存 3删除
    abstract: { type: String }, // 内容
    content: { type: String }, // 内容
    classification: { type: Schema.Types.ObjectId, ref: "Classification" }, // 分类
    releaseTime: { type: Date, default: new Date() }, // 发布时间
    updateTime: { type: Date }, // 更新时间
    comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // 评论
    likeArr: [{type: Schema.Types.ObjectId, ref: "User"}], // 点赞列表
    view: { type: Number, default: 0 }, // 查阅
    like: { type: Number, default: 0 } // 点赞
});

export const ArticleModel: Model<ArticleDocument> = model("Article", ArticleSchema);