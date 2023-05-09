
const conn =require("../db/dbConnection");
const util = require("util");//helper


const seller =async (req, res , next)=>{
    const query = util.promisify(conn.query).bind(conn);
    const {token} =req.headers;
    const seller = await query(
        "select * from users where token= ?",  [token]);
if (seller[0] && seller[0].type=="seller"){
    req.seller=seller[0];
    next();

}else{
    res.status(403).json({
        msg:"you are not authurized this route!",
    })
}
};
module.exports = seller ;