// Is7VLTRfxDqCottt
const express = require('express')
const Product = require('../backend/models/product')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const TOKEN="f7ecc016599b076bc55b10bbc4519bc7";
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect("mongodb+srv://kodivine0:Is7VLTRfxDqCottt@cluster0.dtpkbhr.mongodb.net/")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection Failed!');
    });

var transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "api",
        pass: TOKEN
    }
});

app.post('/product', async (req, res) => {
    const product = await new Product({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        cardNumber: req.body.cardNumber,
        expiry: req.body.expiry,
        cvv: req.body.cvv,
        productTitle: req.body.product,
        variant: req.body.variant,
        quantity: req.body.quantity,
        subtotal: req.body.subtotal,
        orderId: req.body.orderId,
        status: req.body.status
    })
    product.save().then(() => {
        res.json('Product Added')
    }).catch((err) => {
        console.log(err)
    })
});

app.get('/product/:orderId',async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const prod =await Product.findOne({ orderId});
        if(!prod)
            return res.status(404).json({error: "Product not found"});

        if(prod.status==='approved') {
        const info = await transport.sendMail({
          from: 'hello@demomailtrap.co',
          to: prod.email,
          subject: "Order Summary Details",
          text: "Please find your final details attached!", 
        });
        console.log("Message sent:", info.messageId);
        console.log('prodStatus=',prod.status);
        
    }
    // })();
    // console.log(prod);
    res.json(prod);
    } catch(err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;