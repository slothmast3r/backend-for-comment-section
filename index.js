const express = require("express")
const app = express();
const importData = require("./data.json")

let port = process.env.PORT || 3000;


const redis = require('redis');

(async () => {
    const client = redis.createClient({
        url: process.env.REDISTOGO_URL
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key');
})();
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABSE_URL,
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



app.get('/db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            'SELECT * FROM test_table'
        );
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/db', results );
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
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
