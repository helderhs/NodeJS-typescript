import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from "date-fns";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token não existe");
    }

    const user = await usersRepository.findById(userToken.user_id.toString());
    if (!user) {
      throw new AppError("Usuario não existe.");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      // se ativou é pq passou
      throw new AppError("Token expirado.");
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
