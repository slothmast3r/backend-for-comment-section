const express = require("express")
const app = express();
const importData = require("./data.json")

let port = process.env.PORT || 3000;

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.HEROKU_POSTGRESQL_RED_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

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
    importData.comments = 123
    return res.status(200).json(importData)
})

app.put("/data",(req,res)=>{
    return res.status(200).json(req)
})

app.listen(port,()=>{
    console.log(`APP: http://localhost:${port}`)
})
