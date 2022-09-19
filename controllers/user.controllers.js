import { v4 as uuidv4 } from 'uuid';
import {hash, compare} from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
const {TOKEN_SECRET} = process.env;

import Query from '../models/Query.js';

export const findAll = async (req, res, next) => {
    try {
        const query = "SELECT * FROM user";
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

export const findOne = async (req, res, next) => {
    try {
        const query = "SELECT email, alias, firstname, lastname, address, zip, city, signup_date, phone, image_name, uuid, role_id FROM user WHERE uuid = ?";
        const [user] = await Query.getDataByValue(query, req.params.uuid);

        res.status(200).json({
            msg: "user retrieved",
            result: user,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const create = async (req, res, next) => {
    try {
        const datas ={
            alias: req.body.alias,
            password: await hash(req.body.password, saltRounds),
            uuid: uuidv4(),
        }
        const query1 = "SELECT * FROM user WHERE alias = ?";
        const user = await Query.getDataByValue(query1, req.body.alias)
        if(user.length){
            res.status(409).json({
                msg: 'user already existing',
            });
            return;
        }
        const query2 = "INSERT INTO user (alias, password, uuid) VALUES (?,?,?)";
        await Query.save(query2, datas);
        res.status(201).json({
            msg: "user created",
        })
        
    } catch (error) {
        return next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const {alias, password} = req.body;
        const query1 = "SELECT * FROM user WHERE alias = ?";
        const [user] = await Query.getDataByValue(query1, alias);
        if(!user || (user.alias !== req.body.alias)){
            res.status(404).json({
                msg: "user does not exist",
            });
            return;
        } 
        const isSame = await compare(password, user.password);        
        if(isSame){
            const TOKEN = jwt.sign({uuid: user.uuid}, TOKEN_SECRET );
            res.status(200).json({
                msg: "all infos are correct",
                token: TOKEN,
                uuid: user.uuid,
            });
            return;
        } else {
            res.status(401).json({msg: "wrong password"});
            return;            
        }
        
    } catch (error) {        
        return next(error);
    }
}


export const update = async (req,res,next) => {
    try {
        const query = "SELECT * FROM user WHERE uuid = ?";        
        const [user] = await Query.getDataByValue(query, req.params.uuid);
        const datas = {
            alias: !req.body.alias ? user.alias : req.body.alias,
            firstName: !req.body.firstName ? user.firstName : req.body.firstName,
            lastName: !req.body.lastName ? user.lastName : req.body.lastName,
            address: !req.body.address ? user.address : req.body.address,
            zip: !req.body.zip ? user.zip : req.body.zip,
            city: !req.body.city ? user.city : req.body.city,
            phone: !req.body.phone ? user.phone : req.body.phone,
            uuid: !req.params.uuid ? user.uuid : req.body.uuid
        }
        const query2 = "UPDATE user SET alias = ?, firstName = ?, lastName = ?, address = ?, zip = ?, city = ?, phone = ? WHERE uuid = ?";
        await Query.save(query2, datas);
        res.status(200).json({
            msg: "User updated",
        });
        return;
    } catch (error) {
        return next(error)
    }
}

export const remove = async (req,res,next) => {
    try {
        const query = "DELETE FROM user WHERE uuid = ?";
        await Query.remove(query, datas);
        res.status(200).json({
            msg: "user deleted",
        });
        return;
    } catch (error) {
        return next(error)
    }
}