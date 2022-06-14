const express = require ("express");
const router = express.Router();
const db = require("../function.collections/medicamentos");
const val = require("../validators/medicamentos");
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.route("/")
.get(db.getMeds)
.post(val.validateCreate,db.postMeds)
;
router.route ("/:id_med")
.get(db.getOneMed)
.put(val.validateCreate,db.putMed)
.delete(db.delMed);

module.exports = router;