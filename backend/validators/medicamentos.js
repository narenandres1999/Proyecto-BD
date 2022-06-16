const { check, validationResult } = require("express-validator");

const Result = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.send({ errors: err.array() })
    }
}

const validateCreate = [
    check('med_nombre')
        .isString().withMessage("El nombre debe ser una cade de texto")
        .notEmpty().withMessage("Por favor ingresar el nombre del medicamento")
        .exists().withMessage("incluya el med_nombre en el body"),
    check('stock')
        .exists().withMessage("Ingrese la cantidad de inventario del medicamento")
        .isInt().withMessage("Ingrese la cantidad de inventario del medicamento")
        .custom((value, { req }) => {
            if (value <= 0) {
                throw new Error("La cantidad de medicamentos debe ser mayor a 0")
            }
            return true;
        }),
    check('cod_med')
        .isString()
        .notEmpty().withMessage("Por favor añadir el codigo del medicamento")
        .exists().withMessage("ingrese un código de medicamento"),

    check('fecha_ven')
        .isDate().withMessage("Por favor ingresar una fecha con el formato YYYY-MM-DD")
        .notEmpty().withMessage("Por favor ingresar el nombre del medicamento")
        .exists().withMessage("incluya el med_nombre en el body"),

    (req, res, next) => {
        Result(req, res, next)
    }
]
module.exports = {
    validateCreate
}