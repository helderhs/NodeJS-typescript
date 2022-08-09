import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}
class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    //public async execute(data: IRequest) {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer não encontrado");
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
