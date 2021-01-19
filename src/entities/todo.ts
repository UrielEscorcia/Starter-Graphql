import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@ObjectType()
export class Todo {
    @Field()
    readonly _id!: ObjectId;

    @prop({default: new Date()})
    @Field(() => Date)
    createdAt!: Date;

    @prop({default: new Date()})
    @Field(() => Date)
    updatedAt!: Date;

    @prop()
    @Field()
    content!: string;

    @prop({ default: false })
    @Field()
    isDone!: boolean;
}
