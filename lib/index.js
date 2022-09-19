/*export const {LOCAL_PORT : PORT} = process.env; //destructuring pour pouvoir recuperer PORT
export const {DB_HOST, DB_NAME, DB_USER, DB_PWD} = process.env;
//recuperation des variables d'environnement
//utilisation dans application*/

export const PORT = process.env.PORT || process.env.LOCAL_PORT;
export const {DB_HOST, DB_NAME, DB_USER, DB_PWD} = process.env;