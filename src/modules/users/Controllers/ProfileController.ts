import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import updateProfileService from "../services/UpdateProfileService";
import { instanceToInstance } from "class-transformer";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    const user_id = request.user.id;
    const user = await showProfile.execute({ user_id });
    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProdile = new updateProfileService();

    const user = await updateProdile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}
