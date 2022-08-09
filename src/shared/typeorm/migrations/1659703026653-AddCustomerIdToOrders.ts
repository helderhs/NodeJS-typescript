import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddCustomerIdToOrders1659703026653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "customer_id",
        type: "int",
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        name: "OrdersCustomer",
        columnNames: ["customer_id"],
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
