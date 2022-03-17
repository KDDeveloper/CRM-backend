exports.connect = () =>{
    try {
        const mongoose = require("mongoose");
        mongoose.connect("mongodb+srv://KD:KD1996@cluster0.m6jd5.mongodb.net/capstoneCRM?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});
        console.log("connected");
    } catch (err) {
        console.warn(err);
        process.exit();
    }
}

// mongodb+srv://KD:KD1996@cluster0.m6jd5.mongodb.net