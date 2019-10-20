import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'

import authMidlle from './app/middlewares/auth'

import multer from 'multer'
import multerConfig from './config/multer'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
// Middleware global, mas que só será aplicado as rotas que seguem
routes.use(authMidlle)
routes.put('/users', UserController.update)

routes.post('/files', upload.single('file'), FileController.store)

export default routes