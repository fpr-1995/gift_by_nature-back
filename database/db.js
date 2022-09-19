import mysql2 from 'mysql2/promise';

//import variables d'environnement dps index.js
import {DB_HOST, DB_NAME, DB_USER, DB_PWD} from '../lib/index.js';

//console.log(DB_HOST, DB_NAME, DB_USER, DB_PWD);

const pool = mysql.createPool({
    host: DB_HOST ,
    database: DB_NAME ,
    user: DB_USER,
    password: DB_PWD,
});

pool.getConnection() //promesse - chainage 
    .then(res =>{ //si elle est resolue, connection, retourne info souhaité
        console.log(`Connected to ${res.config.database}`)
    })//si elle n'est pas resolue, retourne "err"
    .catch(err => console.log('ERROR --->', err))

export default pool;    
