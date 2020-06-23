const {
  to
} = require("await-to-js");
const ErrorHandler = require("./../helpers/error-handler");
const Logger = require("./../helpers/logger");
const {
  PortalPaths
} = require('./../helpers/paths')
module.exports = class BaseController {
  constructor(controllerName, apiPath) {
    this._controllerName = controllerName;
    this._serviceAPIPath = apiPath;
    this._logger = new Logger().getLogger(`controller-${this._controllerName}`);
  }
  _redirectToForbidden(req, res, next) {
    if (req.headers["client"]) {
      return res.status(403).send({
        redirectUrl: PortalPaths.Forbidden,
        message: "Forbidden"
      })
    }
    return res.redirect(PortalPaths.Forbidden);
  }
};
