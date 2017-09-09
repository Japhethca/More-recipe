// library and controller initiazation
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import apiRouter  from './route/api';

const app = express();

// secret for json web token
app.set('secret_key', 'myverysecuresecretkey');

// for parsing request body content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes



// more recipe api routes
app.use('/api', apiRouter);

app.get('/', (req,res) => {
  res.status(200).json({message: "Welcome to the more recipe app"});
});
app.all('*', (req, res) => {
  res.status(404).send('404: Not Found');
});


// server initialization
const port = process.env.PORT || 8008;
app.listen(port, () => {
  console.log(`Server running. listening on port:  ${port}`);
});

export default app;