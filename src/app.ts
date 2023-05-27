import express, { Application, json } from "express";
import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "./logic";
import { idExist, nameExistCreate, nameExistPatch } from "./middlewares";

const app: Application = express();
app.use(json());

const PORT: number = 3000;
const runningMsg: string = "Server is running";

app.listen(PORT, () => console.log(runningMsg));

app.post("/products", nameExistCreate, createProducts);
app.get("/products", getProducts);
app.get("/products/:id", idExist, getProductsById);
app.patch("/products/:id", nameExistPatch, idExist, updateProducts);
app.delete("/products/:id", idExist, deleteProducts);
