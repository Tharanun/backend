const createError = require("../utils/createError")
const userService = require("../services/user-service")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.registerAdmin = async (req, res, next) =>{
    const {username, password, tel, email} = req.body;
    try{
        if(!username || !password || !tel || !email){
            return createError(400, "บักฮู้ขี้ใส่บ่ครบ")
        }
        if(
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof tel !== "string" ||
            typeof email !== "string"
        ){
            return createError(400, "บักฮู้ขี้ใส่บ่ถืก")
        }

        const isUserExist = await userService.getUserByUsername(username,"Admin");
        if (isUserExist){
            return createError (400, "บักฮู้ขี้มันซ้ำ")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.createAccount(
            username, 
            hashedPassword, 
            tel, 
            email, 
            "Admin"
        )
        res.json({ message: "Register Success." });
    }catch (err){
        next(err)
    }
}

exports.registerUser = async (req, res, next) =>{
    const {username, password, tel, email} = req.body
    try {
        if(!username || !password || !tel || !email){
            return createError(400, "ข้อมูลไม่ครบครับ!")
        }
        if(
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof tel !== "string" ||
            typeof email !== "string"
        ){
            return createError(400, "ใส่ข้อมูลทีเ่ป็นตัวหนังสือเท่านั้น")
        }
        const isUserExist = await userService.getUserByUsername(username, "User");
        if (isUserExist){
            return createError(400, "username ซ้ำ ครับ")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await userService.createAccount(
            username, 
            hashedPassword, 
            tel, 
            email, 
            "User"
        )
        res.json({message : "Register Success."})
    } catch (err) {
        next(err)
    }
}

// AdminLogin
exports.loginAdmin = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        if(!username || !password){
            return createError(400,"Username And Password Require.")
        }
        if(typeof username !== "string" || typeof password !== "string"){
            return createError(400,"Username or Password is invalid.");
        }

        const isUserExist = await userService.getUserByUsername(username,"admin")
        if(!isUserExist){
            return createError (400, "Username or Password is invalid.");
        }

        const isPasswordMath = await bcrypt.compare(
            password,
            isUserExist.password
        );

        if (!isPasswordMath) {
            return createError(400, "Email or Password is invalid.");
        }
        const token = jwt.sign({id: isUserExist.id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.json({token})
    } catch (err) {
        next(err);
    }
}

// UserLogin
exports.loginUser = async(req, res, next) =>{
    const {username, password} = req.body;
    try {
        if(!username || !password){
            return createError(400, 'Username And Password Require')
        }
        if(typeof username !== "string" || typeof password !== "string"){
            return createError(400, 'Username or Password is invalid.')
        }
        const isUserExist = await userService.getUserByUsername(username, 'User')
        if(!isUserExist){
            return createError(400, 'Username or Password is invalid.')
        }
        const isPasswordMath = await bcrypt.compare(
            password,
            isUserExist.password
        )
        if (!isPasswordMath){
            return createError(400,"Email or Password is invalid.")
        }

        const token =jwt.sign({id: isUserExist.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.json({token})
    } catch (err) {
        next(err)
    }
}