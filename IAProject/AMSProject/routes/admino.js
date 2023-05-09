const router = require ("express").Router();
const conn = require("../db/dbConnection");
const admin =require("../middleware/admin");
const authorized =require("../middleware/authorize");
const { body, validationResult } = require("express-validator");
const upload= require("../middleware/uploadimages");
const util = require("util");//helper
const Auth =require("./Auth");
const Auctions =require("./Auctions");

//MANAGE NEW ACCOUNT (ACCEPT-REJECT)

// Get list of new accounts  
router.get("/new-accounts",  async (req, res) => {  
    try {  
      // Fetch new accounts from the database  
      const query = util.promisify(conn.query).bind(conn);  
      const newAccounts = await query("SELECT * FROM users WHERE account_status  = 'pending'");  
    
      // Send the list of new accounts as response  
      res.status(200).json(newAccounts);  
    
    } catch (err){  
      console.log(err);  
      res.status(500).json(err);  
    }  
  });  
    
  // Accept a new account  
  router.put("/accept-account/:user_id",  async (req, res) => {  
    try {  
      // Update the status of the request to 'accepted'  
      const query = util.promisify(conn.query).bind(conn);  
      await query("UPDATE users SET account_status = 'accepted' WHERE user_id = ?", [req.params.user_id]);  
      // Send success response  
      res.status(200).json({ msg: "Account accepted successfully" });  
    } catch (err) {  
      res.status(500).json(err);  
    }  
  });  
    
  // Reject a new account  
  router.put("/reject-account/:user_id",  async (req, res) => {  
    try {  
      // Update the status of the request to 'rejected'  
      const query = util.promisify(conn.query).bind(conn);  
      await query("UPDATE users SET account_status = 'rejected' WHERE user_id = ?", [req.params.user_id]);  
    
      // Send success response  
      res.status(200).json({ msg: "Account rejected successfully" });  
    } catch (err) {  
      res.status(500).json(err);  
    }  
  }); 
 
 
 
//ADMIN [UPDATE STATUS] 
router.put("/:user_id/status",//prams 

 
body("status") 
     .isLength({ min: 1 }), 
 
async(req,res) => {  
 
//1-Validation for request with ,manual 
    const query = util.promisify(conn.query).bind(conn); 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) { 
      return res.status(400).json({errors:errors.array() }); 
    } 
 
 
    //2-CHECK IF USER IS EXISTS OR NOT 
 
const user = await query("select * from users where user_id  = ?", 
[req.params.user_id,]); 
// kda al user m4 mwgod asln 
if(!user[0]){ 
    res.status(400).json({ 
        msg:"User NOT Found !"}); 
} 
 
 
 
//3-PREPARE TO OBJECT 
const updatedStatus ={ 
    status: req.body.status, 
}; 
 
 
//4- update auction in DB 
 
await query("update users set ? where user_id = ?", 
[ 
    updatedStatus, 
    user[0].user_id 
 
]); 
 
 
res.status(200).json({ 
    msg:"STATUS Updated successfully ! ", 
}) 
});



router.get("/:auction_id/transaction", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const allTransactions = await query("SELECT * FROM transaction WHERE auction_id=? AND winnig_bid = (SELECT MAX(winnig_bid) FROM transaction WHERE auction_id=?)", [req.params.auction_id, req.params.auction_id]);

  res.status(200).json(allTransactions);
});



module.exports = router;
