var  companyModel =  require("../models/company");
class company{

    putData = async(databody) =>{

        let {address,name,contact,discription, _id} = databody;
        let data;
        if(_id){

            data = await companyModel.find({_id: _id});
            data = data[0];
            data.address = address;
            data.name = name;
            data.contact = contact;
            data.discription = discription;
            


        }else{
            data = new companyModel({
                name: name,
                discription: discription,
                address: address,
                number_of_orders: 100,
                contact: contact,
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
            data = await companyModel.find().select({"_id":1,"name":1});
        }else{
            data = await companyModel.find({_id: id});
        } 
        return ({data});
        }catch(err){
            return ({
                data : err,
            })
        }
    }

}

module.exports = new company();