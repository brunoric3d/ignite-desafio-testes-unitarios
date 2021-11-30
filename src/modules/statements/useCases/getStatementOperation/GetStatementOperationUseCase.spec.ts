import {InMemoryStatementsRepository} from "../../repositories/in-memory/InMemoryStatementsRepository"
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import {CreateStatementUseCase} from "../createStatement/CreateStatementUseCase";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { OperationType, Statement } from "../../entities/Statement";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { IGetBalanceDTO } from "../getBalance/IGetBalanceDTO";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let statementsRepositoryInMemory: InMemoryStatementsRepository;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("", () => {
  beforeEach(() => {
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    usersRepositoryInMemory = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepositoryInMemory);
    getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepositoryInMemory,statementsRepositoryInMemory)
  });

  it("Should be able to get a statement", async () => {
    const user: ICreateUserDTO = {
      email: "teste@teste.com",
      password: "123456",
      name: "Teste",
    };
    const {id: userId} = await createUserUseCase.execute(user);

    const statement: ICreateStatementDTO = {
      amount: 500,
      description: "Teste",
      user_id: userId as string,
      type: "DEPOSIT" as OperationType,
    }
     const { id: statementId } = await createStatementUseCase.execute(statement);

     const result = await getStatementOperationUseCase.execute({user_id: userId as string, statement_id: statementId as string});

    expect(result).toHaveProperty("id");

  });


});
