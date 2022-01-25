const express = require("express")
const app = express();
const importData =require("./data.json")
const cors = require("cors");

let port = process.env.PORT || 3000;

app.get("/",((req,res)=>{
    res.send("Hello World")
}))

app.get("/data", (req,res)=>{
    res.send(importData)
})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})


app.use(cors())

app.listen(port,()=>{
    console.log(`Exapmle app ${port}`)
})