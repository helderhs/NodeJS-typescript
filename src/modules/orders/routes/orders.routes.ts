import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import OrdersController from "../Controlers/OrdersController";
import isAuthenticated from "@shared/http/middlewares/isAuthentiated";

const orderRouter = Router();
const orderController = new OrdersController();

orderRouter.use(isAuthenticated);

orderRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  orderController.show
);

orderRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      products: Joi.required(),
    },
  }),
  orderController.create
);

export default orderRouter;
