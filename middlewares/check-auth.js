const jwt = require('jsonwebtoken');
const key = require('../config/envvariable');

module.exports = (req,res,next)=>{
    
            if(typeof(req.headers['autherization']) != 'undefined' && req.headers['autherization'] != 'undefined'){
                
            var headerToken = req.headers['autherization'].split(' ')[1];
            
            if(headerToken !== 'undefined'){
                req.token = headerToken;
                console.log(req.token);
                console.log(key.key);
                jwt.verify(req.token , key.key, function(err, decoded){
                    if(err){
                        throw err;
                        return res.json({success : false , message : 'Failed to authenticate Token!'});
                    } else{
                        //the every thinng is good
                        req.decoded = decoded;
                        next();
                    }
                });                
            }else{
                res.json({message : 'Please login again!'});
            }    
        }else{
            res.json({message : 'Please Login again'});
        }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // try{
    //     if(typeof(req.headers['autherization']) != 'undefined' && req.headers['autherization'] != 'undefined'){

    //         var headerToken = req.headers['authorization'].split(' ')[1];
    //         if(headerToken !== 'undefined'){
    //             req.token = headerToken;
    //             jwt.verify(req.token , key.key, function(err, decoded){
    //                 if(err){
    //                     return res.json({success : false , message : 'Failed to authenticate Token!'});
    //                 } else{
    //                     //the every thinng is good
    //                     req.decoded = decoded;
    //                     next();
    //                 }
    //             });                
    //         }else{
    //             res.json({message : 'Please login again!'});
    //         }    
    //     }else{
    //         res.json({message : 'Please Login again'});
    //     }
    // }catch{
    //     res.json({message: 'Auth failed'});
    // }
};