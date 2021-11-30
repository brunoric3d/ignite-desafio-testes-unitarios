import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';
import {InMemoryUsersRepository} from "../../repositories/in-memory/InMemoryUsersRepository"
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import {CreateUserUseCase} from "../createUser/CreateUserUseCase";

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory)


  });

  it("Should be able to show an user profile", async () => {

    const user: ICreateUserDTO = {
      email: "teste@teste.com",
      password: "123456",
      name: "Teste",
    };

    const newUser = await createUserUseCase.execute(user);

    const { id } = newUser ;

    const result = await showUserProfileUseCase.execute(id as string);

    expect(result).toHaveProperty("name");

  });


});
