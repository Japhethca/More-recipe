import express from 'express';
import apiV1  from './v1';
import auth  from '../middlewares/authenticator';
import User from '../controllers/usersContr'

const apiRouter = express.Router();

apiRouter.use(auth.authenticate);
apiRouter.use(apiV1);
apiRouter.use('/v1', apiV1);
apiRouter.get('/admin/users', User.users);

export default apiRouter;
