import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class ListUserService {
  public async execute(): Promise<User[]> {
    //public async execute(data: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const products = await usersRepository.find();

    return products;
  }
}

export default ListUserService;
