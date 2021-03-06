import { NextFunction, Request, Response } from "express";
import { config } from '../../config';

export function authenticate(req: Request, res: Response, next: NextFunction) {

    if (!req.headers.client) {
        res.status(401).json('Unauthorized - no client header provided');
        res.destroy();
        return;
    }

    let client: string = req.headers.client.toString();
    let context = config.clients.find(c => c.id == client);

    if (!context) {
        res.status(401).json('Unauthorized - invalid client header provided');
        res.destroy();
        return;
    }

    res.locals.context = context;
    return next();
}