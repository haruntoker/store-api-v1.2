const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Provide a Product name!']
    },

    price:{
        type: Number,
        required: [true, 'Provide the Price!']
    },

    featured:{
        type: Boolean,
        default:false,
    },

    rating:{
        type: Number,
        default: 4.00,
    },

    createdAt:{
        type: Date,
        default: Date.now(),
    },

    company:{
        type: String,
        enum: {
            values: ['Ikea', 'Liddy', 'Caressa', 'Marcos'],
            message: `{VALUE} is not supported.`,
        }
    }
})



//export
module.exports =  mongoose.model('Product', productSchema)