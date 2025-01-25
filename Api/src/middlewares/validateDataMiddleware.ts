// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import ValidatorContract from "@/validators/contracts/ValidatorContract";

export function validateData(validator: ValidatorContract) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validator.validate(req.body);
			next();
    } catch (error) {
      console.log(error)
    }
  };
}
