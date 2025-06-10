const mongoose =  require('mongoose')

const itemSchema = mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const productSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
    cardNumber: {
        type: Number,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    },
    productTitle: {
        type: String,
        required: true,
    },
    variant: {
        type: [itemSchema],
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Product', productSchema)

