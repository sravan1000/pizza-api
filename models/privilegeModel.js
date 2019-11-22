let mongoose = require('mongoose')

let privilegeSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    company: {
        type: String,
    },

    item: {
        type: String,
    },

    privilege_type:{
        type: String,
    },

    x_for_y:{
        type: String,
    },

    discount:{
        type: Number,
    },

    flat_cost:{
        type: Number,
    },

    discription:{
        type: String,
    },

    min_items_order:{
        type: Number,
    },

    min_purchase_limit:{
        type: Number,
    },

    max_redemptions : {
        type: Number,
    },

    used_count : {
        type: Number,
    },

    start_time :{
        type: Date,
    },

    end_time: {
        type: Date,
    },

    created_on:{
        type: Date
    },

    expired: {
        type: Boolean
    }

})

module.exports = mongoose.model('privilege', privilegeSchema)