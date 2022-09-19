import React from 'react';
import Query from '../model/query.js'

export const findAll = async (req, res, next) => {
    try {
        const query = "SELECT * FROM category";
        const users = await Query.getAllDatas(query);

        res.status(200).json({
            msg: "all users retrieved",
            result: users,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const findByCategory = async (req, res, next) => {
    try {
        const query = "SELECT id FROM category";
        const users = await Query.getDataByValue(query);

        res.status(200).json({
            msg: "all users retrieved",
            result: users,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const query = "DELETE FROM category WHERE id = ?"
        await Query.save(query, req.body);

        res.status(200).json({
            msg: "category deleted",
            result: users,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const create = async (req, res) => {
    try {
        const query1 = "SELECT * FROM category WHERE title = ?";
        const result = await Query.getDataByValue(query1, req.body.title);
        if(result.length){
            res.status(409).json({
                msg: 'category already existing',
            });
            return;
        }
        const query2 = "INSERT INTO category (title) VALUES (?)";
            await Query.save(query2, req.body);
            res.status(201).json({
                msg: "category added",
            });        
    } catch (error) {
        return next(error);
    }
}
