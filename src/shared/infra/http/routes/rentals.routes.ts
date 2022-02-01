import { Router } from 'express';

import { ensureAuthenticated } from '../../../../middlewares/ensureAuthenticated';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
