const express = require("express")
const app = express();
const importData =require("./data.json")

let port = process.env.PORT || 3000;

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


app.get("/",((req,res)=>{
    return res.status(200).json(importData)
}))

app.get("/data", (req,res)=>{
    return res.status(200).json(importData)
})

app.listen(port,()=>{
    console.log(`Exapmle app ${port}`)
})
