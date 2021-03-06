import {InMemoryUsersRepository} from "../../repositories/in-memory/InMemoryUsersRepository";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import {CreateUserUseCase} from "../createUser/CreateUserUseCase";
import {AuthenticateUserUseCase} from "./AuthenticateUserUseCase";
import { AppError } from "../../../../shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "teste@teste.com",
      password: "123456",
      name: "Teste",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "blabla@test.com",
        password: "asdasd",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate using wrong password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        email: "teste@teste.com",
        password: "123456",
        name: "Teste",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "teste@teste.com",
        password: "asdasd",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
