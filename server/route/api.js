import express from 'express';
import { apiV1 } from './v1';
// import { authenticate } from '../middlewares/authenticator';

const apiRouter = express.Router();

// apiRouter.use(authenticate);
apiRouter.use(apiV1);
apiRouter.use('/v1', apiV1);

export { apiRouter };
