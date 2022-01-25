const express = require("express")
const app = express();
const importData =require("./data.json")
const cors = require("cors");

const dotenv = require( "dotenv-safe")
const pg =require("pg")

const Pool = pg.Pool

dotenv.config()

const pool = new Pool({
    connectionString:  process.env.DATABASE_URL,
    ssl: true,
})

let port = process.env.PORT || 3000;

app.get("/",((req,res)=>{
    res.send("Hello World")
}))

app.get("/data", (req,res)=>{
    return res.status(200).json(importData)
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
