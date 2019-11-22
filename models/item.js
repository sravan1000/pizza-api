let mongoose = require('mongoose')

let itemSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    discription: {
        type: String,
    },

    item_cost:{
        type: Number
    },

    company:{
        type: String
    }

})

module.exports = mongoose.model('item', itemSchema)