import express from 'express'
import { findAll, findOne, create, signin, update, remove } from '../controllers/user.controllers.js';

const router = express.Router();

router.get("/all", findAll);
router.get("/:uuid", findOne);

router.post("/create", auth, create);
router.post("/signin", signin);

// mise à jour des données 
router.patch("/:uuid", update);

router.delete("/:uuid", remove)

export default router;

