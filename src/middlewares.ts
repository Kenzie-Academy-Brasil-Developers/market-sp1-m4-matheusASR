import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct, TProductRequest } from "./interfaces";

const nameExistCreate = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const requestBody: TProductRequest[] = req.body
  const requestNamesArr: string[] = []
  for (let i = 0; i < requestBody.length; i++) {
    let requestName = requestBody[i].name
    requestNamesArr.push(requestName)
  }

  const foundSameName = market.some((product) => requestNamesArr.includes(product.name))

  if (foundSameName) {
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
  const foundProductById: IProduct | undefined = market.find((product): boolean => {
    return product.id === parseInt(id);
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

const nameExistPatch = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const requestBody = req.body

  const foundSameName = market.find((product):boolean => product.name === requestBody.name)

  if (foundSameName) {
    return res.status(409).json({
      error: "Product already registered",
    });
  }

  return next();
};

export { nameExistCreate, idExist, nameExistPatch };
