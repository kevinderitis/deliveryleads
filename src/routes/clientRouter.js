import { Router } from 'express';
import { getAll, updateClient, createClient, getData } from '../controllers/clientController.js';
import { isAuthenticated } from '../middleware/middleware.js';

const clientRouter = Router();

clientRouter.get('/', getAll);
clientRouter.get('/data', isAuthenticated, getData);
clientRouter.post('/', createClient);
clientRouter.put('/:id', updateClient);

export default clientRouter;
