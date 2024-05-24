const userModel = require("./models/userSch")
module.exports = {

    async myFunc(p){
      const alluser = await  userModel.find({_id:p})
      const pin=  JSON.stringify(alluser[0].Phone)
      console.log(pin)
      return alluser
    }
   
    }

     

