const express = require ("express");
const router = express.Router();
const db = require("../function.collections/consultas");
const val = require("../validators/consultas");
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.route("/")
.get(db.getCons)
.post(val.validateCreate,db.postCons)
;
router.route ("/:num_consulta")
.get(db.getOneConsulta)
.put(val.validateCreate,db.putOneCons)
.delete(db.deleteOneCons);

router.route ("/:num_consulta/meds")
.get(db.getMedCons)
.post(val.validateAddMed,db.postMedCons)
.delete(db.deleteMedCons);


module.exports = router;