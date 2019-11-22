var  cartModel =  require("../models/cart");
var itemController = require("../controller/itemController");
var privilegeController = require("../controller/privilegeController");
var moment = require("moment");

class cart{

    putData = async(dataItem) =>{
       
        let {item} = dataItem;

        let itemData = await itemController.getData(item);
        let cost = 0;
        if(itemData["data"] && itemData["data"][0]){
            cost = itemData["data"][0].item_cost;
        }
        let data;
        let itemInCart = await this.getData({item});
        if(itemInCart["data"] && itemInCart["data"][0]){
            data = itemInCart["data"][0];
            data.count = data.count + 1;
            data.value = cost * data.count;
        }else{
             data = new cartModel({
                item: item,
                count: 1,
                value: cost,
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
        let data ;
        let totalCost = 0;
        if(query){
            data = await cartModel.find(query);
        }else{
            data = await cartModel.find();

            if(data){
                let dataArray =[]
                data = JSON.parse(JSON.stringify(data));
                data.map((eachCartItem) => {
                    dataArray.push(itemController.getData(eachCartItem["item"]));
                })

                let dataArrayPromisesResult = await Promise.all(dataArray);

                dataArrayPromisesResult.map((eachPromiseResult,index)=>{
                    totalCost = totalCost +data[index]["count"] * eachPromiseResult["data"][0]["item_cost"]
                    data[index]["name"] = eachPromiseResult["data"][0]["name"]
                })

         
            }
        }
        return ({data,totalCost});
        }catch(err){
            return ({
                data : err,
            })
        }
    }

    updateData = async() =>{
        try{
            let data = await cartModel.findOneAndUpdate({
                id: '1'
            },{
                count : 5   //got this value from ui
            },{
                new: true   //return updated doc
            })

            return({
                data
            });
        }catch(error){
            return({error});
        }
    }

    calculateData = async(data) =>{

        let {company} = data;

        let cartData = await this.getData();

        let privilege = {};

        let totalCostItems = 0;

        if(cartData["data"] && cartData["data"].length){

            cartData = cartData["data"];
            let itemIds = [];
            let itemMap = {};
            cartData.map((eachCartItem,index)=>{
                if(!itemIds.includes(eachCartItem["item"])){
                    itemIds.push(eachCartItem["item"]);
                }
            })
            console.log("all item id's",itemIds);

            let privilegePromises = [];

            let itemsPromisses = [];

            itemIds.map((eachItem)=>{

                let query = {
                    item: eachItem,
                    company: company
                }
                privilegePromises.push(privilegeController.getData(query));

                itemsPromisses.push(itemController.getData(eachItem));

            })

            let itemsPromiseResult = await Promise.all(itemsPromisses);
            let privilegePromisesResult = await Promise.all(privilegePromises);

            itemsPromiseResult.map((eachItem,index) =>{
               
                itemMap[eachItem["data"][index]["_id"]] = eachItem["data"][index]["item_cost"]

                totalCostItems = totalCostItems + eachItem["data"][index]["item_cost"]*cartData[index]["count"];
            })

            privilegePromisesResult.map((eachPrivilege) =>{
                console.log(eachPrivilege);
                if(privilege["data"] && privilege["data"].length){
                    privilege[eachPrivilege["data"][0]["item"]] = eachPrivilege["data"][0];

                }
            })

            console.log(privilege);

            let result = this.evaluate(cartData,privilege,itemMap);

            if(result == 0){
                result = totalCostItems;
            }

            return({
                data:result
            });

        }

    }

    evaluate = (cartData,privilege,itemMap) =>{

        let totalCost = 0;

        cartData.map((eachItem)=>{

            if(privilege && Object.keys(privilege).length){

                let privilegeTemp = privilege[eachItem.item];

                let count = eachItem.count;
                
                let remainingCount = 0;

                let now = moment();

                let continueObj = true;

                if(privilegeTemp["start_time"]){

                    let start_time = moment(privilegeTemp["start_time"]);

                    if(!(now.diff(start_time) > 0)){
                        continueObj = false;
                    }
                }

                if(privilegeTemp["end_time"]){
                    let end_time = moment(privilegeTemp["start_time"]);

                    if(!(now.diff(end_time) < 0)){
                        continueObj = false;
                    }
                }

                if(privilegeTemp["min_purchase_limit"]){

                    let itemsCost = eachItem["count"] * Number(itemMap[eachItem.item]);

                    if(! (itemsCost >= privilegeTemp["min_purchase_limit"]) ){
                        continueObj = false;
                    }
                }

                if(!(privilegeTemp["min_items_order"] && (eachItem["count"] >= privilegeTemp["min_items_order"] )) ){
                    continueObj = false;
                }

                if(privilegeTemp["privilege_type"] == "x_for_Y"  && continueObj){

                    let xAndY = privilegeTemp["x_for_y"].split(",");
                    let x = Number(xAndY[0]);
                    let y = Number(xAndY[1]);
                
                    for(let i = count ; i >= x    ; i = i-x ){
                            totalCost = totalCost + (y*  Number(itemMap[eachItem.item]) );
                    }
                }else if(privilegeTemp["privilege_type"] == "discount" && continueObj){

                    let totalCost = eachItem["count"] * Number(itemMap[eachItem.item]);
                    let discountedPrice = totalCost - (totalCost * privilegeTemp["discount"])/100
                    totalCost = totalCost + discountedPrice;

                }else if(privilegeTemp["privilege_type"] == "flat_cost" && continueObj){

                    totalCost = totalCost + (eachItem["count"] * privilegeTemp["flat_cost"]);

                }

            }
            

        })

        return totalCost;
    }

    deleteData = async(dataItem) =>{

        let {id} = dataItem;

        let data = {}

        let cartItemDelete = await cartModel.remove({ _id: id }, function(err) {
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

module.exports = new cart();