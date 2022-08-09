import AppError from "@shared/errors/AppError";
import { Response } from "express";
import path from "path";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<String | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuario não existe");
    }

    //console.log(user);

    const token = await userTokensRepository.generate(Number(user.id));

    console.log(token);
    const tokenGerado = token.token;

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[API VENDAS] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${tokenGerado}`,
          token: tokenGerado,
        },
      },
    });
    return tokenGerado;
  }
}

export default SendForgotPasswordEmailService;
