import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate";

const productsRoutter = Router();
const productsController = new ProductsController();

productsRoutter.get("/", productsController.index);

productsRoutter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().required() },
  }),
  productsController.show
);

productsRoutter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create
);

productsRoutter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  productsController.update
);

productsRoutter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().required() },
  }),
  productsController.delete
);

export default productsRoutter;
