  //============intialize Express App============
  const express = require("express");
  const app = express();

    //============Global Middleware============ (bysm7ly lma ab3t aykey w ay value a3rf a3ml acess ll ey da )
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));//to acess url from encoded
 app.use(express.static('upload'));// b3rf al server 3la al file aly feh al image(assets)
const cors = require("cors");
app.use(cors());//allow HTTP requests local host(frontend y3rf yklm al backend)
app

//============Required moudule============
const auth = require("./routes/Auth");
const auctions = require("./routes/Auctions");
const admino = require("./routes/admino");

//============Run the app============s
app.listen(4000,"localhost", () => {
console.log("SERVER IS RUNING");
});



//============ API ROUTES[ENDPOINT] ============

app.use("/auth",auth);
app.use("/auctions",auctions);
app.use("/admino",admino);