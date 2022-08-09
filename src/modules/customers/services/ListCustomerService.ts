import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";

interface IPaginationCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    //public async execute(data: IRequest) {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customers = await customersRepository.find();

    return customers;
  }

  public async executePagination(): Promise<IPaginationCustomer> {
    //public async execute(data: IRequest) {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginationCustomer;
  }
}

export default ListCustomerService;
