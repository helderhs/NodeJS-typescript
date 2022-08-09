import OrdersProducts from "@modules/orders/typeorm/entities/OrderProducts";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product)
  order_products: OrdersProducts[];

  @Column()
  name: String;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
