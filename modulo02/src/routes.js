import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderControiler from './app/controllers/ProviderControiler';
import FileController from './app/controllers/FileController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);
routes.get('/providers', ProviderControiler.index);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
