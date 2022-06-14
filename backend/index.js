const express = require ("express");
const cors = require ("cors");
const app = express();
app.use(cors({
    origin:'*'
}))
const consultaRoutes = require("./routes/consultas");
const medRoutes = require("./routes/medicamentos");
//const exportarRoutes = require ("./routes/exportar");
app.use("/cons",consultaRoutes);
app.use("/meds",medRoutes);
// app.use("/exp",exportarRoutes);
const server = app.listen(3050,()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log ("Se ha conectado con exito al servidor",host,port);
})