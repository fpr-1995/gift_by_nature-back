import React from 'react';
import express from 'express'
import { findAll, findOneProduct} from '../controllers/product.controllers';


const router = express.Router();

router.get("/all", findAll); //http://localhost:3000/api/v1/product/all
router.get("/:id", findOneProduct); //http://localhost:3000/api/v1/product/:id

router.post("/create", create); //http://localhost:3000/api/v1/product/create

export default router