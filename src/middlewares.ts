import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

const nameExist = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const name: string = req.body.name;
  const foundProductByName: IProduct | undefined = market.find((product) => {
    product.name === name;
  });

  if (foundProductByName) {
    return res.status(409).json({
      error: "Product already registered",
    });
  }

  return next();
};

const idExist = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { id } = req.params;
  const foundProductById: IProduct | undefined = market.find((product) => {
    product.id === parseInt(id);
  });

  if (!foundProductById) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.locals = {
    ...res.locals,
    foundProductById,
    productIndex: market.indexOf(foundProductById)
  }

  return next();
};

export { nameExist, idExist };
