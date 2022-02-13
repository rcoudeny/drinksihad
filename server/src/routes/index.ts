import { Express, Request, Response } from 'express';
const groupsRouter = require('./groups');
const userRouter = require('./users');

export default function (app: Express) {
    app.get('/', (req: Request, res: Response) => res.json({ message: 'alive' }));
    app.use('/groups', groupsRouter);
    app.use('/users', userRouter);
}