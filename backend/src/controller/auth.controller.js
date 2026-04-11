
const authService=require("../services/auth.service")



exports.register=async(req,res)=>{
    try {
        const user=await authService.register(req.body);
        res.status(201).json({
            message:"User Succesfully Register",
            user
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.login=async(req,res)=>{
    try {
        const data=await authService.login(req.body);
        res.cookie("token",data)
        res.json({
            message:"User succesfully loged In",
            data
        })
    } catch (error) {
        console.log(error.message);
    }
}