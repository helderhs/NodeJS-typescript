import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
class updateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    //public async execute(data: IRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    //console.log("Aee " + userUpdateEmail?.id + "-" + user_id);
    if (
      userUpdateEmail &&
      userUpdateEmail.id.toString() !== user_id.toString()
    ) {
      throw new AppError("There is already one user with this email.");
    }

    if (password && !old_password) {
      throw new AppError("Old password is required.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.");
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default updateProfileService;
