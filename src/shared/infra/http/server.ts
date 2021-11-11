import express, {
    NextFunction,
    Request, Response,
} from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import '../typeorm';
import '../../container';

import swaggerConfig from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import { router } from './routes';

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

app.listen(3333, () => console.log('Server is running on port 3333'));
