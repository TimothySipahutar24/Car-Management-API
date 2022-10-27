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

  async registerAdmin(req, res) {
    // const body = req.body;
    const isSuperAdmin = req.user.role;
    if (isSuperAdmin == "super admin") {
      try {
        const admin = await authService.registerAsAdmin(body);
        res.status(201).json({
          status: "OK",
          data: admin,
        });
      } catch (err) {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      }
    } else {
      res.status(401).json({
        status: "FAIL",
        message:
          "You're not authorize since only super admin can register an admin!",
      });
      return;
    }
  },

  login(req, res) {
    const { email, password } = req.body;

    authService
      .login(email, password)
      .then((auth) => {
        if (!auth) {
          res.status(401).json({
            status: "FAIL",
            message: "email or password is incorrect",
          });
          return;
        }

        res.status(200).json({
          status: "OK",
          data: auth,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  authorize(req, res, next) {
    const Bearer = req.headers.authorization;
    if (!Bearer) {
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }

    const token = Bearer.split("Bearer ")[1];

    authService
      .authorize(token)
      .then((user) => {
        if (!user) {
          res.status(403).json({
            message: "Unauthorized",
          });
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(403).json({
          message: "Unauthorized",
        });
      });
  },

  getCurrentUser(req, res) {
    const user = req.user;
    try {
      res.status(200).json({
        status: "OK",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
