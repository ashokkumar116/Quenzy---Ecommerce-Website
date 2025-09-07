const cron = require("cron");
const https = require("https");

const job = new cron.CronJob("*/14 * * * *",function (){
    https.get(process.env.API_URL,(res)=>{
        if(res.statusCode === 200){
            console.log("Get Request Sent Successfully");
        }
        else{
            console.log("Get Request Failed", res.statusCode);
        }
    }).on("error",(err)=>{
        console.log("Error while sending Request",err);
    })
})

module.exports = job;