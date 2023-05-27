import { Request, Response } from "express";
import { market } from "./database";
import {
  IProduct,
  TProductRequest,
  IResponseCreateProduct,
  TProductUpdate
} from "./interfaces";

const createProducts = (req: Request, res: Response): Response => {
  const requestBody: TProductRequest[] = req.body;
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var count = market.length + 1

  const newArrayProduct: IProduct[] = requestBody.map((product) => {
    return {
      ...product,
      id: count++,
      expirationDate: new Date(year + 1, month, day)
    }
  })

  newArrayProduct.forEach((product) => {
    market.push(product)
  })

  const responseCreateProduct: IResponseCreateProduct = {
    total: newArrayProduct.reduce((acc, cur) => acc + cur.price, 0),
    marketProducts: newArrayProduct
  }

  return res.status(201).json(responseCreateProduct);
};

const getProducts = (req: Request, res: Response): Response => {
  const database: IResponseCreateProduct = {
    total: market.reduce((acc, cur) => acc + cur.price, 0),
    marketProducts: market
  }

  return res.status(200).json(database);
};

const getProductsById = (req: Request, res: Response): Response => {
  const foundProductById = res.locals.foundProductById
  return res.status(200).json(foundProductById);
};

const updateProducts = (req: Request, res: Response): Response => {
  const { foundProductById, productIndex } = res.locals

  const requestBody: TProductUpdate = req.body
  const product: IProduct = (market[productIndex] = {
    ...foundProductById,
    ...requestBody
  })

  return res.status(200).json(product);
};

const deleteProducts = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market.splice(productIndex, 1);
  return res.status(204).json();
};

export {
  createProducts,
  getProducts,
  getProductsById,
  updateProducts,
  deleteProducts,
};
