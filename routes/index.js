var express = require('express');
var router = express.Router();
let privilegeContoller = require('../controller/privilegeController');
let companyController = require('../controller/companyController');
let cartController = require('../controller/cartController');
let itemController = require('../controller/itemController');

router.post('/save/privilege',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]).data;

    privilegeContoller.putData(data).then((result,err)=>{

        let data =  JSON.parse(Object.keys(req.body)[0]).data;

            if(err){
                res.send("got an error"+ err);
            }else{
                res.send({
                    data:result["data"]
                })
            }
    });
});

router.post('/delete/privilege',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]).data;

    privilegeContoller.deleteData(data).then((result,err)=>{

        if(err){

            res.send("got an error"+ err);

        }else{
            res.send({
                data:result["data"]
            })
        }
    });

})

router.get('/fetch/privilege',function(req,res){
    let query = {};
    if(req.query && req.query.id){
        id = req.query.id;
        query["_id"] = id;
    }
    privilegeContoller.getData(query).then((result,err)=>{

            if(err){
                res.send("got an error"+ err);
            }else{
                res.send({
                    data:result["data"]
                })
            }
    });
})

router.post('/save/company',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]).data;

    companyController.putData(data).then((result,err)=>{

            if(err){
                res.send("got an error"+ err);
            }else{
                res.send({
                    data:result["data"]
                })
            }
    });
});

router.get('/fetch/company',function(req,res){
    let id = null;
    if(req.query && req.query.id){
        id = req.query.id;
    }
    companyController.getData(id).then((result,err)=>{

            if(err){
                res.send("got an error"+ err);
            }else{
                res.send({
                    data:result["data"]
                })
            }
    });
})


router.post('/calculate/cart',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]).data;

    cartController.calculateData(data).then((result,err)=>{

        if(err){

            res.send("got an error"+ err);

        }else{
            res.send({
                data:result["data"]
            })
        }
    });

})
router.post('/delete/cart',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]).data;

    cartController.deleteData(data).then((result,err)=>{

        if(err){

            res.send("got an error"+ err);

        }else{
            res.send({
                data:result["data"]
            })
        }
    });

})

router.post('/save/cart',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]).data;

    cartController.putData(data).then((result,err)=>{

            if(err){
                res.send("got an error"+ err);
            }else{
                res.send({
                    data:result["data"]
                })
            }
    });
});

router.get('/fetch/cart',function(req,res){
    
    cartController.getData().then((result,err)=>{

            if(err){
                res.send("got an error"+ err);
            }else{
                // console.log(result["data"]);
                res.send({
                    data:result["data"],
                    totalCost:result["totalCost"]
                })
            }
    });
})


router.post('/save/item',function(req,res){

    let data =  JSON.parse(Object.keys(req.body)[0]).data;

    itemController.putData(data).then((result,err)=>{

            if(err){
                res.send("got an error"+ err);
            }else{
                res.send({
                    data:result["data"]
                })
            }
    });
});



router.get('/fetch/item',function(req,res){
    
    let id = null;
    if(req.query && req.query.id){
        id = req.query.id;
    }

    itemController.getData(id).then((result,err)=>{

            if(err){
                res.send("got an error"+ err);
            }else{
                res.send({
                    data:result["data"]
                })
            }
    });
})


module.exports = router;