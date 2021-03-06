import 'reflect-metadata';
import express, {
    NextFunction,
    Request, Response,
} from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import '../../container';

import swaggerConfig from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import createConnection from '../typeorm';
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swagger.serve, swagger.setup(swaggerConfig));
app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).json({ status: 'error', message: `Internal server error - ${error.message}` });
});

export { app };
