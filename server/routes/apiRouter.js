import express from 'express';
import swaggerUI from 'swagger-ui-express';

import apiV1 from './apiV1';
import Authenticator from '../middlewares/Authenticator';

const swaggerDocs = require('../../swagger.json');

const options = {
  customCss: '.swagger-ui .topbar {padding: 20px 0; background-color: #714229;}',
  customSiteTitle: 'More Recipes',
  customfavIcon: 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1508739862/favicon_i0k72l.ico'
};


const apiRouter = express.Router();

apiRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));
apiRouter.use(Authenticator.authenticate);
apiRouter.use(apiV1);
apiRouter.use('/v1', Authenticator.authenticate, apiV1);

export default apiRouter;
