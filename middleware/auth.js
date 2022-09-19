import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;
console.log(TOKEN_SECRET)

// middleware d'autorisation d'accès à des routes
// depuis le front (react), lors de la requête AJAX en "option", il faudra transmettre dans les headers la "key"  "x-access-token" qui aura pour valeur le token de l'utilisateur connecté
// après evaluation de la valeur de ce token, on passe à son décodage, pour vérifier si le token correspond et n'a par exemple pas été changé entre 2 échanges client/serveur
// on peut se servir du payload pour transmettre une donnée à la fonction suivante suite à la résolution de la vérification
export const auth = (req, res, next) => {
    const TOKEN = req.headers['x-access-token'];
    console.log('AUTH TOKEN', TOKEN)
    if(TOKEN === undefined || TOKEN === "null"){
        res.status(404).json({msg: "token not found"});
        return;
    }else {
        jwt.verify(TOKEN, TOKEN_SECRET, (err, decoded)=>{
            console.log('DECODED',decoded)
            if(err){
                res.status(401).json({status: 401, msg: "token invalid"});
                return;
            } else {
                req.params.uuid = decoded.uuid;
                next();
            }
        });
    }
}