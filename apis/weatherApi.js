const axios = require("axios");

const { OW_MAP_BASE_URL, OW_MAP_API_KEY } = process.env;

const validations = {
  validateCity: (city) => {
    const allowedCities = ["BARCELONA", "MADRID"];

    const validation = allowedCities.includes(city.toUpperCase());
    return validation;
  },
};

const weatherApi = {
  getCurrentWeather: async (city) => {
    try {
      if (!validations.validateCity(city)) {
        return {
          success: false,
          message: "Ciudad inválida",
        };
      }
      const weatherResponse = await axios.get(
        `${OW_MAP_BASE_URL}/weather?q=${city}&appid=${OW_MAP_API_KEY}&units=metric`
      );

      return {
        actualTemp: weatherResponse.data.main.temp,
        actualHumidity: weatherResponse.data.main.humidity,
      };
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = weatherApi;
