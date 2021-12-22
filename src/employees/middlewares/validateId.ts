import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';

export function validateId(req: Request, res: Response, next: NextFunction) {
  if (req.params[0] !== '') {
    if (!mongoose.Types.ObjectId.isValid(req.params[0])) {
      return res.status(400).send(`Invalid object id: ${req.params[0]}`);
    }
  }
  next();
}
