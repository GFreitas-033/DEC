const {
    createPool
} = require("mysql");

const pool = createPool({
    host: "",
    user: "",
    password: "",
    database: "",
    connectionLimit: 10
})
