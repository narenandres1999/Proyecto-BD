const { check, validationResult } = require("express-validator");

const Result = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.send({ errors: err.array() })
    }
}
// Estaran todos los metodos que me haran validaciones de datos
const validateCreate = [ // encargado,motivo,fecha_consulta,cod_paciente,genid,nombre,telefono

    check('nombre')
        .exists()
        .not().isEmpty().withMessage("por favor ingrese un nombre"),
    check('cod_paciente')
        .exists()
        .not()
        .isEmpty().withMessage("ingrese el código del estudiante")
        .isNumeric().withMessage("solo se permiten valores numericos para el codigo del estudiante"),
    check('fecha_consulta')
        .exists()
        .not().isEmpty().withMessage("Por favor ingresar una fecha")
        .isDate().withMessage("Debe tener un formato de fecha YYYY-MM-DD"),
    check('genero')
        .exists()
        .notEmpty().withMessage("Por favor ingrese un valor valido para el genero")
        .custom((value, { req }) => {
            if (value <= 0) {
                throw new Error("Genero incorrecto")
            }
            return true;
        }),
    check('encargado')
        .exists()
        .not().isEmpty().withMessage("Por favor ingresar el nombre de un encargado"),
    check('telefono')
        .exists()
        .not().isEmpty().withMessage("por favor ingrese un telefono")
        .custom((value,{req})=>{
            if (isNaN(value)){
                throw new Error("El telefono debe contener solo números")
            }
            return true;
        }),
    check('motivo')
        .exists(),
    (req, res, next) => {
        Result(req, res, next)
    }
]
const validateAddMed = [//id_med,cantidad
    check('id_med')
        .exists()
        .isNumeric().withMessage("Solo se permiten valores numericos"),
    check('cantidad')
        .exists()
        .isNumeric().withMessage("Solo se permiten valores numericos"),
    (req, res, next) => {
        Result(req, res, next)
    }
]
module.exports = {
    validateCreate,
    validateAddMed
}
