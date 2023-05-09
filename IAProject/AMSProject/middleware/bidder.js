
const conn =require("../db/dbConnection");
const util = require("util");//helper


const bidder =async (req, res , next)=>{
    const query = util.promisify(conn.query).bind(conn);
    const {token} =req.headers;
    const bidder = await query(
        "select * from users where token= ?",  [token]);
if (bidder[0] && bidder[0].type=="bidder"){
    req.bidder=bidder[0];
    next();

}else{
    res.status(403).json({
        msg:"you are not authurized this route!",
    })
}
};
module.exports = bidder ;