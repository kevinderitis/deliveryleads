import { Router } from 'express';
import { getAll, updateClient, createClient, getData, updatePhone, updateClientState, updateUserPhone, setTelegramChatId } from '../controllers/clientController.js';
import { isAuthenticated, isAdmin } from '../middleware/middleware.js';

const clientRouter = Router();

clientRouter.get('/', isAdmin, getAll);
clientRouter.get('/data', isAuthenticated, getData);
clientRouter.post('/', createClient);
clientRouter.put('/:id/data', updateClient);
clientRouter.put('/phone', isAuthenticated, updatePhone);
clientRouter.put('/user/phone', isAdmin, updateUserPhone);
clientRouter.put('/state', isAuthenticated, updateClientState);
clientRouter.post('/telegram', setTelegramChatId);

export default clientRouter;
