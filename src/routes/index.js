const useRoute = require("./useRoute");
const detailRoute = require("./detailRoute");
const routes = (app) => {
  app.use("/api/user", useRoute);
  app.use("/api/detail", detailRoute);
};
module.exports = routes;  
