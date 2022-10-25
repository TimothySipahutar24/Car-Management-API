const carService = require("../../../../services/carService");

module.exports = {
  list(req, res) {
    carService
      .list()
      .then((car) => {
        res.status(200).json({
          status: "OK",
          data: {
            car: car.data,
            data: car.count,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async create(req, res) {
    const body = req.body;
    try {
      const car = await carService.create(body);

      res.status(201).json({
        status: "OK",
        data: car,
      });
    } catch (err) {
      res.status(201).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  update(req, res) {
    carService
      .update(req.body, req.params.id)
      .then((car) => {
        res.status(200).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    carService
      .getDetail(req.params.id)
      .then((car) => {
        res.status(200).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(201).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    carService
      .delete(req.params.id)
      .then(() => {
        res.status(204).json({
          message: "Car has been deleted",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
