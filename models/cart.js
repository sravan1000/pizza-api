let mongoose = require('mongoose')

let cartSchema = new mongoose.Schema({

    item: {
        type: String,
    },

    count:{
        type: Number,
    },

    value:{
        type: Number        
    },

})

module.exports = mongoose.model('cart', cartSchema)