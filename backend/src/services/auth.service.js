const authRespository=require("../repository/auth.Repository")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


exports.register=async({email,password})=>{
    const hashedPass=await bcrypt.hash(password,10);

    return await authRespository.createUser({email,password:hashedPass});
}

exports.login=async({email,password})=>{
   const user=await authRespository.findByEmail(email);
   if(!user){
    throw new Error("Incorrect Credentials");
   }

   const isMatch=bcrypt.compare(password,user.password);

   if(!isMatch){
    throw new Error("Incorrect Credentials");
   }

   const token=jwt.sign({
     id:user.id,role:user.role
   },process.env.JWT_SECRET

)

return token;
}


