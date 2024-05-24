const useRoute = require("./useRoute");
const routes = (app) => {
  app.use("/api/user", useRoute);
};
module.exports = routes;
