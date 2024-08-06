const express = require("express");
const {
  create,  
  signIn,
} = require("../controllers/user");


const router = express.Router();

router.post("/signup",  create);
router.post("/signin",  signIn);




module.exports = router;
