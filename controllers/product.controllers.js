import React from 'react';

export const findAll = async (req, res, next) => {
    try {
        const query = "SELECT * FROM product";
        const users = await Query.getAllDatas(query);

        res.status(200).json({
            msg: "all producs retrieved",
            result: products,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const findOneProduct = async (req, res, next) => {
    try {
        const query = "SELECT id, title, description, price, category_id FROM product";
        const user = await Query.getDataByValue(query, req.params.uuid);

        res.status(200).json({
            msg: "user retrieved",
            result: user[0],
        });
        return;
    } catch (error) {
        return next(error);
    }
}