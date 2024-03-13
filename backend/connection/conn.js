const {
    createPool
} = require("mysql");

const pool = createPool({
    host: "localhost",
    user: "",
    password: "",
    database: "",
    connectionLimit: 10
});

// pool.query('select * from noticia', (err, result, fields) => {
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

