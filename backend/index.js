const express = require ("express");
const app = express();
const consultaRoutes = require("./routes/consultas");
//const exportarRoutes = require ("./routes/exportar");
app.use("/cons",consultaRoutes);
// app.use("/exp",exportarRoutes);
const server = app.listen(3050,()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log ("Se ha conectado con exito al servidor",host,port);
})