var apiRoutes = express.Router();
var key  = require('../config/envvariable'); 

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, key.key , function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // // if there is no token
    // // return an error
    // return res.status(403).send({ 
    //     success: false, 
    //     message: 'No token provided.' 
    // });
    res.json({message : " Login fail please login again !"});

  }
});


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);