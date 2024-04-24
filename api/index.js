import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import {UserModel as User} from "./models/User.js";
import BookingModel from "./models/Booking.js";
import PlaceModel from "./models/Place.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from "multer";
import fs from 'fs';
const app=express();


const bcryptSalt=bcrypt.genSaltSync(10);
const jwtsecret="naoinwadnionqwdjqdpoqdmqocwnoqcnoiqcnoi";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json()); 
app.use(cookieParser());
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

mongoose.connect(process.env.MONGO_URL);

app.get("/test",(req,res)=>{
    res.json("yes its working");
}) 
app.post("/register", async(req,res)=>{ 
   const{name,email,password}=req.body;
   try {
    const userdoc=await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt) 
       }); 
       res.json(userdoc);
   } catch (error) {
       console.log(error);
   }
});


app.post("/login",async(req,res)=>{
   const{email,password}=req.body;
   try {
    const userDoc= await User.findOne({email});
    if(userDoc){
       const passok=bcrypt.compareSync(password,userDoc.password);
       if(passok){
        jwt.sign({email:userDoc.email,id:userDoc._id},jwtsecret,{},(err,token)=>{
            if(err) throw err;
            res.cookie("token",token).json(userDoc);
        }) 
       }
       else{
        res.sendStatus(422).json("Pass Not Ok")
       } 
    }
    else{
        res.json("not found");
    }
   } catch (error) {
        console.log(error);
   }
   
});


app.get("/profile",async(req,res)=>{
    try {
        const {token}= await req.cookies
    if(token){
    jwt.verify(token,jwtsecret,{},async(err,user)=>{
       if(err) throw err
       const {name,email,_id} =await User.findById(user.id) 
       res.json({name,email,_id});
    })
    }
    else{
        res.json("null") 
    }
    } catch (error) {
       console.log(error); 
    }
    
})

app.post("/upload-by-link",async(req,res)=>{ 
    const { link } = req.body;
    const newname = "photo" + Date.now() + ".jpg";
    const destPath = join(__dirname, "uploads", newname);
    if (!link) {
        return res.status(400).json({ error: "Link is required" });
    }
    console.log("hello");
    imageDownloader.image({
        url: link,
        dest: destPath
    }).then(() => {
        console.log("image stored");
        res.json(newname);
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Error storing image" });
    });
}); 
 
const photoMiddleware=multer({dest:"uploads/"});
app.post("/uploads",photoMiddleware.array('photos',100),(req,res)=>{
    const uploadedfiles=[];
    for(let i=0;i<req.files.length;i++){
        const fileInfo=req.files[i];
        const{path,originalname}=fileInfo;
        const parts=originalname.split(".");
        const ext=parts[parts.length-1];
        const newpath=path+"."+ext;
        fs.renameSync(path,newpath);
        uploadedfiles.push(newpath.replace("uploads\\", ""));
    }
    res.json(uploadedfiles);
})

app.post("/places",async(req,res)=>{
    const {token}= await req.cookies
    const{ title, address, addedphoto, description, perks, extrainfo, checkin, checkout, maxguests,price }=req.body;
    jwt.verify(token,jwtsecret,{},async(err,user)=>{
     const placeDoc= await  PlaceModel.create({
        owner:user.id,
        title, address, addedphoto, description, perks, extraInfo:extrainfo, checkIn:checkin, checkOut:checkout, maxGuests:maxguests,price
       })
       res.json(placeDoc);
     })
})

app.get(("/user-places"),async(req,res)=>{
    const {token}= await req.cookies;
    jwt.verify(token,jwtsecret,{},async(err,user)=>{
          const{id}=user;
          res.json(await PlaceModel.find({owner:id})); 
        })
})

app.put("/places",async(req,res)=>{
    const {token}= await req.cookies;
    const{id, title, address, addedphoto, description, perks, extrainfo, checkin, checkout, maxguests,price }=req.body;
    jwt.verify(token,jwtsecret,{},async(err,user)=>{
        if(err) throw err;
        const PlaceDoc=await PlaceModel.findById(id)
        if(user.id===PlaceDoc.owner.toString()){
           PlaceDoc.set({
            title, address, addedphoto, description, perks, extraInfo:extrainfo, checkIn:checkin, checkOut:checkout, maxGuests:maxguests,price
           });
            await PlaceDoc.save()
            res.json("ok");
        }
      });
}) 
app.get("/places/:id",async(req,res)=>{
    const {id}=req.params;
    res.json(await PlaceModel.findById(id));  
})
app.post("/logout",(req,res)=>{ 
    res.cookie("token","").json(true);
})

app.get("/places",async(req,res)=>{ 
    res.json(await PlaceModel.find());
})

function getUserDataFromToken(req){
 return new Promise((resolve,reject)=>{
    jwt.verify(req.cookies.token,jwtsecret,{},async(err,user)=>{
        if (err) throw err
        resolve(user)
    })
 })
}


app.post("/booking",async(req,res)=>{
    const user= await getUserDataFromToken(req);
    console.log(user);
    const {place,checkIn,checkOut,numberOfGuests,name,mobile,price}=req.body;
    BookingModel.create({
        place,User:user.id,checkIn,checkOut,numberOfGuests,name,mobile,price
    }).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        throw err
    })
})

app.get("/bookings",async(req,res)=>{
    const user= await getUserDataFromToken(req);
    res.json(await  BookingModel.find({User:user.id}).populate('place'))
})

app.listen(4000, ()=>{
    console.log("the server is working");
})