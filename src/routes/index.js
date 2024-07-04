const useRoute = require("./useRoute");
const DetailRouter = require("./DetailRouter");
const routes = (app) => {
  app.use("/api/user", useRoute);
  app.use("/api/detail", DetailRouter);
};
module.exports = routes;
