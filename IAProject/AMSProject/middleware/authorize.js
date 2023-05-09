
const conn =require("../db/dbConnection");
const util = require("util");//helper
const { use } = require("../routes/Auctions");


const authorized =async (req, res , next)=>{
    const query = util.promisify(conn.query).bind(conn);
    const {token} =req.headers;
    const user = await query(
        "select * from users where token= ?",  [token]);
if (user[0]){
    req.user=user[0];
   // res.locals.user=user[0];
    next();

}else{
    res.status(403).json({
        msg:"you are not authurized this route!",
    })
}
};
module.exports = authorized;