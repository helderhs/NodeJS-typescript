import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}
class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    //public async execute(data: IRequest) {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer não encontrado");
    }

    return customer;
  }
}

export default ShowCustomerService;
