const {Pool} = require ('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    password:'root',
    database:'pruebasProyectoBD',
    port:'5432'
});
// exportamos el modulo paara poder usarlo en otros .js
module.exports = { 
    query: (text, params,callback) => pool.query(text, params,callback) 
};
