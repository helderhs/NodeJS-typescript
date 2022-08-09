import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustomersController from "../controllers/CustomersController";
import isAuthenticated from "@shared/http/middlewares/isAuthentiated";

const customersRoutter = Router();
const customersController = new CustomersController();

customersRoutter.use(isAuthenticated);
customersRoutter.get("/", customersController.index);

customersRoutter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().required() },
  }),
  customersController.show
);

customersRoutter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  customersController.create
);

customersRoutter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  customersController.update
);

customersRoutter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().required() },
  }),
  customersController.delete
);

export default customersRoutter;
