const db = require("../database/db");
// enpoints para la ruta "/"
//metodo que me deuelve todas las consultas registradas
 
const getCons = (req,res)=>{
    let total = 0;
    db.query
    ('SELECT * FROM consulta_total where borrar = false ORDER BY num_consulta ASC',
        (err,items)=>{
        if (err){
            console.log ("ha ocurrido un error");
            res.json({"message":"ha ocurrio un error","error":err});
        }
        db.query('select count (num_consulta) as total from consulta_total where borrar = false;',(err,result)=>{
            if (err){
                console.log ("ha ocurrido un error");
                res.json({"message":"ha ocurrio un error","error":err});
            }
            total = parseInt(result.rows[0].total);
            res.json({"items":items.rows,"total":total})
        })
    })

    
};
// Agrega consultas nuevas a la base de datos
const postCons = (req,res)=>{
    const {encargado,motivo,fecha_consulta,cod_paciente,genero,nombre,telefono} = req.body;
    // addconsulta (encargado,motivo,fecha_consulta,cod_paciente,genid,nombre,telefono)
    db.query('CALL addconsulta($1,$2,$3,$4,$5,$6,$7);',
    [encargado,motivo,fecha_consulta,cod_paciente,genero,nombre,telefono],(err,result)=>{
    if (err){
        res.json(err);
    }
    res.json({"message":"se añadio con exito","result": result});
    })
};

// Endpoints para la ruta /:num_consulta
// Obtiene la informacion de una consulta seleccionada por id
const getOneConsulta = (req,res)=>{
    const id = req.params.num_consulta;
    db.query("SELECT * FROM consulta_total WHERE num_consulta = $1 AND borrar = false;",[id],(err,result)=>{
        if (err){
            res.json(err);
        }
        res.json(result.rows);
    })
}
// num integer,encar varchar,mot varchar,fecha date,cod integer,gid integer,nom varchar,tele varchar
const putOneCons = (req,res)=>{
    const id = req.params.num_consulta;
    const {encargado,motivo,fecha_consulta,cod_paciente,genero,nombre,telefono} = req.body;
    db.query("call update_consulta ($1,$2,$3,$4,$5,$6,$7,$8);",
    [id,encargado,motivo,fecha_consulta,cod_paciente,genero,nombre,telefono],(err,result)=>{
        if (err){
            res.json({"message":"ha ocurrido algo","message":err});
        } 
        res.json({"message":"se ha actualizado con exito","result": req.body});
    })
}
const deleteOneCons = (req,res)=>{
    const id = req.params.num_consulta;
    db.query("update consultas set borrar = true where num_consulta = $1",[id],(err,result)=>{
        if (err) res.json({"message":err});
        res.json({"message":"se ha eliminado con exito","result":result});
    })
}
// Endpoints para la ruta /:num_consulta/meds
// Agrega los medicamentos que se seleccionaron
const getMedCons = (req,res)=>{
    const id = req.params.num_consulta;
    db.query("select * from (cons_med natural join medicamentos) as res where num_consulta = $1 order by id_med asc;",
    [id],(err,result)=>{
        if (err){
            res.json(err)
        }
        res.json(result.rows);
    })
}
// Me permite añadir los medicamentos que se dan en la consulta
const postMedCons = (req,res)=>{
    const {id_med,cantidad} = req.body;
    const id = req.params.num_consulta;
    db.query("INSERT INTO cons_med (id_med,num_consulta,cantidad) VALUES ($1,$2,$3)",
    [id_med,id,cantidad],(err,result)=>{
        if (err){
            res.json({err})
        }
        res.json({"message":"se añadio con exito","result":result});
    })
}
const deleteMedCons = (req,res)=>{
    const id = req.params.num_consulta;
    db.query("delete from cons_med where num_consulta = $1;",[id],(err,result)=>{
        if (err) res.json(err)
        res.json({"message":"se ha borrado con exito"});
    })
}
// exporto los modelos
module.exports = {
getCons,
postCons,
getOneConsulta,
postMedCons,
putOneCons,
deleteOneCons,
getMedCons,
deleteMedCons
};