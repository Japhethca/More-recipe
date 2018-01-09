import express from 'express';
import swaggerUI from 'swagger-ui-express';

import ApiV1 from './ApiV1';
import Authenticator from '../middlewares/Authenticator';

const swaggerDocs = require('../../swagger.json');

const options = {
  customCss: '.swagger-ui .topbar {padding: 20px 0; background-color: #714229;}',
  customSiteTitle: 'More Recipes',
  customfavIcon: 'http://res.cloudinary.com/dcmxbxzyj/image/upload/v1508739862/favicon_i0k72l.ico'
};


const ApiRouter = express.Router();

ApiRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, options));
ApiRouter.use(Authenticator.authenticate);
ApiRouter.use(ApiV1);
ApiRouter.use('/v1', Authenticator.authenticate, ApiV1);

export default ApiRouter;
