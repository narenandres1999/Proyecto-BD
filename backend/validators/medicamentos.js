const {check,validationResult} = require("express-validator");

const Result = (req,res,next)=>{
    try{
        validationResult(req).throw()
        return next()
    }catch(err){
        res.send({errors: err.array()})
    }
}

const validateCreate = [
    check('cod_med')
    .isString()
    .notEmpty().withMessage("Por favor añadir el codigo del medicamento")
    .exists().withMessage("incluya el cod_med en el body"),
    check('med_nombre')
    .isString()
    .notEmpty().withMessage("Por favor ingresar el nombre del medicamento")
    .exists().withMessage("incluya el med_nombre en el body"),
    check('fecha_ven')
    .isDate().withMessage("Por favor ingresar una fecha con el formato YYYY-MM-DD")
    .notEmpty().withMessage("Por favor ingresar el nombre del medicamento")
    .exists().withMessage("incluya el med_nombre en el body"),
    check('stock')
    .exists()
    .isInt()
    .custom((value,{req})=>{
        if (value <= 0){
            throw new Error("La cantidad de medicamentos debe ser mayor a 0")
        }
        return true;
    }),
    (req,res,next)=>{
        Result(req,res,next)
    }
]
module.exports = {
    validateCreate
}