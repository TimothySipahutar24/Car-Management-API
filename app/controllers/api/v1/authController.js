const authService = require("../../../../services/authService");

module.exports = {
  async register(req, res) {
    const body = req.body;
    try {
      const user = await authService.register(body);
      res.status(201).json({
        status: "OK",
        data: user,
      });
    } catch (error) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
