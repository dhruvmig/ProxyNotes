const express = require('express');
const mongoose = require ('mongoose');
const user=require('./routes/user');
const video=require('./routes/video');
const password=require('./routes/password');
const app=express();
const sgMail = require('@sendgrid/mail');
app.use(express.json());

app.use('/user', user);
app.use('/',video);
app.use('/',password);
app.use('/uploads',express.static('uploads'))

mongoose.connect("mongodb://localhost/proxy", { useNewUrlParser: true,useFindAndModify:false }, 
) // this returns promise
    .then(() => console.log("Connected to Mongodb"))
    .catch((e) => console.log("Could not connect to Mongodb",e));

app.listen(3000, function() { 
    console.log("Server running on localhost:" + 3000);
});