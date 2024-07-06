const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const user = require('..\models\User.js')

router.get("/", (req, res)=>{
  user.find()
  .sort({data: -1})
  .then((user) => res.json(user))
  .catch((err) => res.status(404).json({notfound: " not found users"}))
});
module.exports = router;