import {InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository"
import { ICreateStatementDTO } from "./ICreateStatementDTO";
import {CreateStatementUseCase} from "./CreateStatementUseCase";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { OperationType } from "../../entities/Statement";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;

describe("", () => {
  beforeEach(() => {
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    usersRepositoryInMemory = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepositoryInMemory);
  });

  it("Should be able to create an statement", async () => {
    const user: ICreateUserDTO = {
      email: "teste@teste.com",
      password: "123456",
      name: "Teste",
    };
    const {id} = await createUserUseCase.execute(user);

    const statement: ICreateStatementDTO = {
      amount: 500,
      description: "Teste",
      user_id: id as string,
      type: "DEPOSIT" as OperationType,
    }


    const result = await createStatementUseCase.execute(statement)

    expect(result).toHaveProperty("id");

  });


});
