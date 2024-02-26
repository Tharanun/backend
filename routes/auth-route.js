const express = require("express")
const router = express.Router();

const authController = require('../controllers/auth-controller')
// const isAdmin = require('../middlewares/admin')

router.post("/registerAdmin", authController.registerAdmin)
router.post("/registerUser", authController.registerUser)
router.post("/loginAdmin", authController.loginAdmin)
router.post("/loginUser", authController.loginUser)
// router.get('/admin/dashboard', isAdmin, (req, res) => {
//     res.json({ message: 'Admin Dashboard' });
//   });

module.exports = router;