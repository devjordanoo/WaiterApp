// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { CustomMessageError } from '@/errors/CustomMessageError';

import { StatusCodes } from 'http-status-codes';
import ValidatorContract from "@/validators/contracts/ValidatorContract";

export function validateData(validator: ValidatorContract) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validator.validate(req.body);
			next();
    } catch (error: any) {
			const customMessageError = new CustomMessageError(error);

      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Request validation failed',
        message: customMessageError.message,
      });
    }
  };
}
