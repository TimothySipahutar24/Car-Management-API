const carRepository = require("../repositories/carRepository");

module.exports = {
  create(requestBody) {
    return carRepository.create(requestBody);
  },

  update(requestBody, id) {
    return carRepository.update(requestBody, id);
  },

  delete(id) {
    return carRepository.delete(id);
  },

  async list() {
    try {
      const cars = await carRepository.findAll();
      const carCount = await carRepository.getTotalCar();

      return {
        data: cars,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },

  getDetail(id) {
    return carRepository.findById(id);
  },
};
