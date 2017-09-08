import jwt from 'jsonwebtoken';
import   app   from '../app';


const auth = {
  authenticate (req, res, next){
    const token = req.body.token || req.query.token || req.headers.token;

    if (req.url === '/users/signin' || req.url === '/users/signup') {
      next();
    } else if (token) {
      jwt.verify(token, app.get('secret_key'), (err, decoded) => {
        if (err){
          return res.status(401).json({ message: 'Authentication failed!' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      res.status(403).json({ message: 'failed! No token. Sign in to get one.' });
    }
  },


// contoller to handle unimplemented methods
  notImplemented(req, res){
    res.status(405).json( { message: 'Method not supported!'} );
  },
}

export default  auth;
