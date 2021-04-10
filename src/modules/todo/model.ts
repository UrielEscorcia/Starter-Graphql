import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Service } from "typedi";

import { Todo } from "../../entities";
import { NewTodoInput } from "./input";

// This generates the mongoose model for us
export const TodoMongooseModel = getModelForClass(Todo);

@Service()
export default class TodoModel {
    async getById(_id: ObjectId): Promise<Todo | null> {
        // Use mongoose as usual
        return TodoMongooseModel.findById(_id).lean().exec();
    }

    async create(data: NewTodoInput): Promise<Todo> {
        return TodoMongooseModel.create(data as Todo);
    }

    async list(): Promise<Todo[]>{
        return TodoMongooseModel.find({}).lean()
    }

    async update(_id: ObjectId, data: NewTodoInput): Promise<Todo>{
        const todo = await TodoMongooseModel.findByIdAndUpdate(_id, data, {new: true})
        return todo?.toObject()
    }

    async remove(_id: ObjectId): Promise<Todo>{
        const todo = await TodoMongooseModel.findByIdAndRemove(_id)
        return todo as Todo
    }
}
