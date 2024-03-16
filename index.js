const express = require('express');
const app = express();
const port = 5000;

const path = require('path');

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, './frontend/index.html'));
});

app.listen(port,()=>{
    console.log("Servidor rodando");
});
