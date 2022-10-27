const express = require("express");
const swaggerUI = require("swagger-ui-express");
const controllers = require("../app/controllers");
const swaggerDocument = require("../openapi.json");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
// appRouter.get("/", controllers.main.index);

apiRouter.get(
  "/api/v1/cars",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carController.list
);
apiRouter.post(
  "/api/v1/cars",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carController.create
);
apiRouter.put(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carController.update
);
apiRouter.get(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carController.show
);
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.carController.destroy
);

// register and login
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);

// needs authorization
apiRouter.post(
  "/api/v1/register-as-admin",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.registerAdmin
);
apiRouter.get(
  "/api/v1/current-user",
  controllers.api.v1.authController.authorize,
  controllers.api.v1.authController.getCurrentUser
);

// open api docs
apiRouter.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
