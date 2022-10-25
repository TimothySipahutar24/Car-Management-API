const express = require("express");
const controllers = require("../app/controllers");

const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
// appRouter.get("/", controllers.main.index);

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get("/api/v1/cars", controllers.api.v1.carController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.carController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.carController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.carController.show);
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.carController.destroy);

// auth register and login
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);

appRouter.use(apiRouter);

/** Mount Not Found Handler */
appRouter.use(controllers.main.onLost);

/** Mount Exception Handler */
appRouter.use(controllers.main.onError);

module.exports = appRouter;
