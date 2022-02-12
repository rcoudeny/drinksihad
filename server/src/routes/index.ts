import { Express, Request, Response } from 'express';
const groupsRouter = require('./groups');

export default function (app: Express) {
    app.get('/', (req: Request, res: Response) => res.json({message: 'alive'}));
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
    app.use('/groups', groupsRouter);
}