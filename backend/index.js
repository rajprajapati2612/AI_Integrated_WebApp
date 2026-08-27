
require("dotenv").config();


const app = require('./src/app');



const connectDB = require("./config/database");
const generateInterviewReport  = require("./src/services/ai.service");


connectDB();
console.log("KEY EXISTS:", !!process.env.GOOGLE_GENAI_API_KEY)

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})