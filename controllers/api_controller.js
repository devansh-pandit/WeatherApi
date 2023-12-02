const axios = require("axios") 


async function getWeatherData(cities) {
    const weatherPromises = cities.map(async (city) => {
      
      const apiUrl = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city='+city;
  
      try {
        const response = await axios.get(apiUrl,
         { headers: {
          'X-RapidAPI-Key': '3663a8d5ccmsh06019e79637d635p186a39jsn7f5c828bfa4f',
          'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }});
        const temperature = response.data.temp;
        return { [city]: `${temperature}C` };
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error.message);
        return { [city]: 'N/A' };
      }
    });
    return Promise.all(weatherPromises).then((data) => Object.assign({}, ...data));
  }

exports.weatherApi = async (req,res)=>{

    try {
        const { cities } = req.body;
    
        if (!cities || !Array.isArray(cities)) {
          return res.status(400).json({ error: 'Invalid input' });
        }
        const weatherData = await getWeatherData(cities);
        res.json({ weather: weatherData });
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
      }

}