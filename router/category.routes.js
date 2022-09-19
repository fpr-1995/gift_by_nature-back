import React from 'react';
import express from 'express'
import { findAll, findByCategory, create, addImage } from '../controllers/category.controllers';


const router = express.Router();

router.get("/all", findAll); //http://localhost:3000/api/v1/category/all
router.get("/:id", findByCategory); //http://localhost:3000/api/v1/category/:id

router.post("/create", create);//http://localhost:3000/api/v1/category/create
router.post("/addImage", addImage);//http://localhost:3000/api/v1/category/addImage

router.post("/delete/:id")//http://localhost:3000/api/v1/category/addImage

export default router