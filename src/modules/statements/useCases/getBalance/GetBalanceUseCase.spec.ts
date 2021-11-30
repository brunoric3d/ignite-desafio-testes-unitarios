import {InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository"
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import {CreateStatementUseCase} from "../createStatement/CreateStatementUseCase";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { OperationType } from "../../entities/Statement";
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { IGetBalanceDTO } from "./IGetBalanceDTO";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("", () => {
  beforeEach(() => {
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    usersRepositoryInMemory = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepositoryInMemory);
    getBalanceUseCase = new GetBalanceUseCase(statementsRepositoryInMemory, usersRepositoryInMemory)
  });

  it("Should be able to get the balance", async () => {
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

     await createStatementUseCase.execute(statement);

     const result = await getBalanceUseCase.execute({user_id: id} as IGetBalanceDTO)

    expect(result).toHaveProperty("balance");

  });


});
