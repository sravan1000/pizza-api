var  itemModel =  require("../models/item");

class item{

    putData = async(dataItem) =>{
        let {name,discription,cost,_id,company} = dataItem;
        let data = null;
        if(_id){
            data =  await itemModel.find();
            data = data[0];
            data.name = name;
            data.discription = discription;
            data.item_cost = cost;
            data.company = company;
        }else{
            data = new itemModel({
                name: name,//'small pizza', 
                discription: discription,
                company: company,
                item_cost: cost
            })
        }
         
        try{
           let dataAdd = await data.save();
           return({
               data: dataAdd
           })
        }catch(error){
            return ({
                data:error
            })
            console.log("failed while saving the data.." + error);
        }
    }

    getData = async(id) =>{
        try{
        let data = null;
        if(!id){
            data = await itemModel.find().select({"_id":1,"name":1});
        }else{
            data = await itemModel.find({_id: id});
        } 
        // let data = await itemModel.find({company: 'infosys'});
        return ({data});
        }catch(err){
            retun ({
                data : err,
            })
        }
    }

}

module.exports = new item();