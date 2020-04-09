var express = require('express');
var parser= require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(parser.urlencoded({extended:false}));
const regSchema= new mongoose.Schema({
    empName: String,
    empCode: Number,
    empCompany: String,
    empEmail:String,
    empPhone:Number,
    empPassword:String
});
const regmodel= mongoose.model('registrations',regSchema);
mongoose.connect("");
app.get('/',(req,res)=>{
    res.send('hai');
});
app.post('/register',async(req,res)=>{
    try {
        var data= new regmodel(req.body);
        var result= await data.save();
        res.json(result);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Started");
});