var  privilegeModel =  require("../models/privilegeModel");
class privilege{

    putData = async(dataItem) =>{
       
        let {company , discount, discription, end_time, start_time, flat_cost, item, max_redemptions} =  dataItem;
        let {min_items_order,min_purchase_limit,name, privilege_type, x_for_y, _id} = dataItem;
        let data;
        if(_id){
            data = await privilegeModel.find({_id});
            if(data){
                data = data[0];
                data.name = name;
                data.discription = discription;
                data.company = company;
                data.item = item;
                data.privilege_type = privilege_type ;
                data.x_for_y = x_for_y ;
                data.discount = discount;
                data.flat_cost = flat_cost;
                data.min_items_order = min_items_order;
                data.min_purchase_limit = min_purchase_limit;
                data.max_redemptions = max_redemptions;
                data.start_time = start_time;
                data.end_time = end_time;
            }
            
        }else{

            data = new privilegeModel({
                name,
                discription,
                company,
                item,
                privilege_type ,
                x_for_y,
                discount,
                flat_cost,
                min_items_order,
                min_purchase_limit,
                max_redemptions,
                privilege_used_count : 0,
                start_time,
                end_time,
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

    getData = async(query) =>{
        try{
            let data = null;
            if(!query){
                data = await privilegeModel.find().select({"_id":1,"name":1});
            }else{
                data = await privilegeModel.find(query);
            }
        return ({data});
        }catch(err){
            return ({
                data : err,
            })
        }
    }

    deleteData = async(dataItem) =>{

        let {id} = dataItem;

        let data = {}

        let privilegeDelete = await privilegeModel.remove({ _id: id }, function(err) {
            if (!err) {
                    data.type = 'success';
            }
            else {
                    data.type = 'fail';
            }
        });

        return({data});
    }

}

module.exports = new privilege();