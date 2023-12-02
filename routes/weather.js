const express = require('express');
const router = express.Router();
const weather = require("../controllers/api_controller")


router.post('/getWeather',weather.weatherApi);
router.get("/",(req,res)=>{
    console.log(__dirname+"../../public/index.html")
    res.sendFile(__dirname+"../../public/index.html")


})

module.exports = router;