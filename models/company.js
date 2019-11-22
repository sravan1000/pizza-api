let mongoose = require('mongoose')

let companySchema = new mongoose.Schema({

    name: {
        type: String,
    },

    discription: {
        type: String,
    },

    number_of_orders:{
        type: String,
    },

    contact:{
        type: String
    }

    // items_available:[] //id's of items of that company

})

module.exports = mongoose.model('company', companySchema)