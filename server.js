const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Thread = require("./models/Thread");

const PORT = 3000;

// ExpressでJsonを使うぜということを宣言
app.use(express.json());
// Expressがpublicフォルダを参照するぜのおまじない
app.use(express.static("public"));

// DB接続、mongoDBパスワードを使用、あとはDB名を決める
mongoose.connect("mongodb+srv://takiyama:Kyohei0202@cluster0.rhh5z.mongodb.net/thread?retryWrites=true&w=majority")
.then(() => {
    console.log("db connected");
})
.catch((err) => console.log(err));


// WebApi作成

// get
// エンドポイントを指定
app.get("/api/v1/thread",async (req , res) =>{
    try{
        const allThreads = await Thread.find({});
        res.status(200).json(allThreads)
    }catch(err){
        console.log(err);
    }
})

// post
app.post("/api/v1/thread",async (req , res) =>{
    try{
        const createThreads = await Thread.create(req.body);
        res.status(200).json(createThreads);
    }catch(err){
        console.log(err);
    }
})

// サーバー起動処理
app.listen(PORT , console.log("server running"));