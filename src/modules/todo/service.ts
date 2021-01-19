import { Service } from "typedi";
import { ObjectId } from "mongodb";

import TodoModel from "./model";
import { Todo } from "../../entities";
import { NewTodoInput } from "./input";

@Service() // Dependencies injection
export default class TodoService {
    private todoModel: TodoModel
    constructor() {
        this.todoModel = new TodoModel()
    }

    public async getById(_id: ObjectId): Promise<Todo | null> {
        return this.todoModel.getById(_id);
    }

    public async addTodo(data: NewTodoInput): Promise<Todo> {
        const newTodo = await this.todoModel.create(data);

        // Business logic goes here
        // Example:
        // Trigger push notification, analytics, ...

        return newTodo;
    }

    public async list(): Promise<Todo[]> {
        return this.todoModel.list()
    }

    public update(_id: ObjectId, data: NewTodoInput){
        return this.todoModel.update(_id, data)
    }

    public async deleteById(_id: ObjectId): Promise<Todo> {
        return this.todoModel.remove(_id);
    }


}
