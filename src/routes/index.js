const useRoute = require("./useRoute");
const DetailRouter = require("./detailRouter");
const routes = (app) => {
  app.use("/api/user", useRoute);
  app.use("/api/Detail", DetailRouter);
};
module.exports = routes;
