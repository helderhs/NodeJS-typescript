import { EntityRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";

interface IFindProducs {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducs[]): Promise<Product[]> {
    const productsIds = products.map((product) => Number(product.id));

    const existsProduct = await this.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProduct;
  }
}
