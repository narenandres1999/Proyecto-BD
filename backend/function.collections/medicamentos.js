const db = require("../database/db");

// endpoint raiz ("/")
// Trae todos los medicamentos
const getMeds = (req, res) => {
    db.query("SELECT * FROM medicamentos WHERE borrado = false order by id_med asc", (err, result) => {
        if (err) {
            res.json(err);
        }
        res.json(result.rows);
    })
}
// Permite añadir nuevos medicamentos a la base de datos
const postMeds = (req, res) => {
    const { cod_med, med_nombre, fecha_ven, stock } = req.body;
    db.query("INSERT INTO medicamentos (cod_med,med_nombre,fecha_ven,stock) values ($1,$2,$3,$4);",
        [cod_med, med_nombre, fecha_ven, stock],
        (err, result) => {
            if (err) {
                res.json(err)
            }
            res.json({ message: "Se ha añadido con exito", result })
        })
}
// ruta (/:id_med)
// Obtiene un medicamento en especifico
const getOneMed = (req,res)=>{
    const id_med = req.params.id_med;
    db.query("SELECT * FROM medicamentos WHERE borrado = false AND id_med = $1",[id_med] ,(err, result) => {
        if (err) {
            res.json(err);
        }
        res.json(result.rows);
    })
}
// Actualiza los datos de un medicamento
const putMed = (req, res) => {
    const id_med = req.params.id_med;
    const { cod_med, med_nombre, fecha_ven, stock } = req.body;
    db.query("update medicamentos set cod_med = $1,med_nombre = $2,fecha_ven = $3,stock = $4 where id_med = $5;",
        [cod_med, med_nombre, fecha_ven, stock,id_med],
        (err, result) => {
            if (err) {
                res.json(err)
            }
            res.json({ message: "Se ha actualizado con exito", result })
        })
}
// Elimina el medicamento
const delMed = (req, res) => {
    const id_med = req.params.id_med;
    db.query("update medicamentos set borrado = true where id_med = $1;",[id_med],(err,result)=>{
        if (err){
            res.json(err)
        }
        res.json({message:"Se ha eliminado con exito",result})
    })
}

module.exports = {
    getMeds,
    postMeds,
    getOneMed,
    putMed,
    delMed
}