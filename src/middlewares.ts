import { NextFunction, Request, Response } from "express";

const nameExist = (req: Request, res: Response, next: NextFunction): Response | void => {
    

    return next()
}

const idExist = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { id } = req.params

    return next()
}

export { nameExist, idExist }