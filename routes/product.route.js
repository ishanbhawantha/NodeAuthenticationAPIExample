var router = require('express').Router();
var protectRoutes = require('./protect.route');



router.get('/items',  protectRoutes ,(req, res) =>{
    res.json({message : "This is protected route" });
});
