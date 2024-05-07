import { Router } from 'express';
import { getAll, updateClient, createClient } from '../controllers/clientController.js';

const clientRouter = Router();

clientRouter.get('/', getAll);
clientRouter.post('/', createClient);
clientRouter.put('/:id', updateClient);

export default clientRouter;
