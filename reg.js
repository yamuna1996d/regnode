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
mongoose.connect("mongodb+srv://dbuser:ava1996@cluster0-xpwmn.mongodb.net/test?retryWrites=true&w=majority");
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
app.post('/login',async(req,res)=>{
    try {
        var searchempCode=req.body.mycode;
        var searchpassword= req.body.mypass;
        regmodel.find({
            $and:[
                {
                    "empCode":searchempCode
                },
                {
                    "empPassword":searchpassword
                }
            ]
        },(error,data)=>{
            if(error){
                throw error;
            }
            if (data.length>0) {
                res.json({"status":"Failed"});
            }
            else{
                res.json({"status":"Success"});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server Started");
});