// library and controller initiazation
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import path from 'path';
import fileupload from 'express-fileupload';
import webpackConfig from '../webpack.config.dev';
import apiRouter from './routes/api';


dotenv.config();

const app = express();

// secret for json web token
app.set('secret_key', process.env.SECRET_KEY);


// for parsing request body content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// file upload module
app.use(fileupload());

// static file path
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static((path.join(__dirname, '../public'))));
}

// dont run weppack dev middleware on production
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true
  }));
}

// more recipe api routes
app.use('/api', apiRouter);

if (process.env.NODE_ENV !== 'development') {
  // react app node
  app.get('/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
  });
} else {
  app.get('/*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}
app.all('*', (req, res) => {
  res.status(404).send('404: Not Found');
});


// server initialization
const port = process.env.PORT || 50000;
app.listen(port, () => {
  console.log(`Server running. listening on port:  ${port}`);
});

export default app;
