import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}
class updateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    //public async execute(data: IRequest) {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    const customerExiste = await customersRepository.findByEmail(email);

    //console.log("Aee " + userUpdateEmail?.id + "-" + user_id);
    if (customerExiste && email !== customer.email) {
      throw new AppError("There is already one customer with this email.");
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default updateCustomerService;
