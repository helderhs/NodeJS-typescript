import CustomerRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrderRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Cliente não existente.");
    }

    const existsProducts = await productsRepository.findAllByIds(products);
    if (!existsProducts) {
      throw new AppError("Algum produto não foi encontrado.");
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    // verifica inexistentes
    const checkInecistentProducts = products.filter(
      (product) => !existsProductsIds.includes(Number(product.id))
    );

    if (checkInecistentProducts.length) {
      throw new AppError(
        `Produto não encontrado com o codigo ${checkInecistentProducts[0].id}.`
      );
    }

    const quantityAvaliable = products.filter(
      (product) =>
        existsProducts.filter((p) => p.id == Number(product.id))[0].quantity <
        product.quantity
    );

    if (quantityAvaliable.length) {
      throw new AppError(
        `A quantidade  ${quantityAvaliable[0].quantity} não esta disponivel para ${quantityAvaliable[0].id}.`
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: Number(product.id),
      quantity: product.quantity,
      price: existsProducts.filter((p) => p.id === Number(product.id))[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        existsProducts.filter((p) => p.id === Number(product.product_id))[0]
          .quantity - product.quantity,
    }));
    //verificar erro aula 94
    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
