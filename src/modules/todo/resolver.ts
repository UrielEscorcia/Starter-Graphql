import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";

import { Todo } from "../../entities";
import TodoService from "./service";
import { NewTodoInput } from "./input";

/*
IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Todo)
export default class TodoResolver {
    constructor(private readonly todoService: TodoService) {}

    @Query((returns) => Todo)
    async getTodo(@Arg("id") id: ObjectId) {
        const todo = await this.todoService.getById(id);

        return todo;
    }

    @Query((returns) => [Todo])
    async todos() {
        const todos = await this.todoService.list()

        return todos;
    }

    @Mutation((returns) => Todo, {nullable:true})
    async createTodo(@Arg("createTodoData") createTodoData: NewTodoInput): Promise<Todo> {
        const todo = await this.todoService.addTodo(createTodoData);
        return todo;
    }

    @Mutation((returns) => Todo)
    async updateTodo(@Arg("id") id: ObjectId ,@Arg("updateTodoData") updateTodoData: NewTodoInput): Promise<Todo> {
        const todo = await this.todoService.update(id, updateTodoData)
        return todo
    }

    @Mutation((returns) => Todo, {nullable: true})
    async deleteTodo(@Arg("id") id: ObjectId) {
        const todo = await this.todoService.deleteById(id);

        return todo || null;
    }
}
