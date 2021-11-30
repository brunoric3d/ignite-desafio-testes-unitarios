import {InMemoryUsersRepository} from "../../repositories/in-memory/InMemoryUsersRepository"
import { ICreateUserDTO } from "./ICreateUserDTO";
import {CreateUserUseCase} from "./CreateUserUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create an user", async () => {
    const user: ICreateUserDTO = {
      email: "teste@teste.com",
      password: "123456",
      name: "Teste",
    };
    const result = await createUserUseCase.execute(user);

    expect(result).toHaveProperty("id");

  });


});
