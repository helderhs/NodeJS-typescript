import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdataUserAvatarService";

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      // ESSE SERIA O CORRETO
      //avatarFilename: request.file.filename,
      avatarFilename: "arquivoVerificar",
    });

    return response.json(user);
  }
}
