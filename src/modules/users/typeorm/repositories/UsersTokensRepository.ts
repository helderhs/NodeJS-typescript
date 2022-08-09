import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: number): Promise<UserToken> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;
