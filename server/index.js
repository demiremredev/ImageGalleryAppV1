const http = require("http");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
const {
  Nuxt,
  Builder
} = require('nuxt')

const log4js = require("log4js");
const Logger = require("./helpers/logger");
const {  DashboardPath } = require('./helpers/paths');
const ConfigManager = require('./helpers/config-manager');
/**
 * The server.
 *
 * @class Server
 */
class Server {
  static bootstrap() {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // create expressjs application
    this.loadConfiguration();
    this.app = express();

    Logger.initializeLogger();
    this._logger = new Logger().getLogger("index");
    this.config();
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.configureCSRF();
    this.registerAPIRoutes();
    this.configureNuxtAndListenServer();
  }


  /**
   *  Load Configuration from conf json
   */
  loadConfiguration() {
    const configManager = new ConfigManager()
    global.conf = configManager.getConfigurations()
    global.__basedir = __dirname;
  }

  /**
   * Create API routers. This routers use csrf token!
   *
   * @class Server
   * @method api
   */
  registerAPIRoutes() {
    let imageRouter = require('./apis/image/image.routers');

    this.app.use('/api', imageRouter);
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  config() {
    this.port = global.conf.listenPort;
    this.app.use(
      log4js.connectLogger(Logger.getHttpLogger(), {
        level: "INFO",
        format: "[:method :status :url - :response-timems :res[content-length]] - [:req[Host] :req[x-forwarded-for] - :remote-addr] - [HTTP/:http-version - :user-agent]"
      })
    );
    this.app.use(bodyParser.json({
      limit: "20mb"
    }));
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    // security related configurations

    this.app.use(this.configureOptionsMethod);

    process.on("unhandledRejection", (reason, p) => {
      this._logger.error("Unhandled exception", reason, p);
      throw reason; // optional, in case you want to treat these as errors
    });
  }
  configureCSRF() {
    this.app.use(csrf({ cookie: true }));
    const self = this;
    // csrf error handler that logs without stack trace
    this.app.use((err, req, res, next) => {
      // pass to chain if not related to csrf
      if (err.code !== 'EBADCSRFTOKEN') return next(err);

      try {
        self._logger.warn("Invalid CSRF token detected from : ", req.headers['host']);
        return res.status(401).send({
          redirectUrl: DashboardPath,
          message:"Invalid CSRF token detected"
        })
      } catch (err) {
        self._logger.warn("Invalid CSRF token detected but host not found");
        return res.status(401).send({
          redirectUrl: DashboardPath,
          message:"Invalid CSRF token detected"
        })
      }
    });

    this.app.use(function (req, res, next) {
      var token = req.csrfToken();
      res.cookie('X-XSRF-TOKEN', token);
      res.cookie('csrftoken', token);
      res.locals.csrfToken = token;
      next();
    });

  }
  configureOptionsMethod(req, res, next) {
    if (req.method === "OPTIONS") {
      res.status(200).end();
    } else {
      next();
    }
  }

  async configureNuxtAndListenServer() {
    let config = require('./../nuxt.config.js')

    // We instantiate Nuxt.js with the options
    const isProd = process.env.NODE_ENV === 'production'
    config.dev = !isProd
    console.log('env', process.env.NODE_ENV)

    const nuxt = new Nuxt(config)
    const builder = new Builder(nuxt)
    await builder.build()
    // No build in production
    // if (!isProd) {
    //   const builder = new Builder(nuxt)
    //   await builder.build()
    // } else {
    //   await nuxt.ready()
    // }

    // Give nuxt middleware to express
    this.app.use(nuxt.render);
    this.listen();
  }

  /**
 * Start HTTP server listening
 */
  listen() {
    // listen on provided ports
    this.express_server = this.app.listen(this.port);

    // add error handler
    this.express_server.on("error", error => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind =
        typeof this.port === "string"
          ? `Pipe ${this.port}`
          : `Port ${this.port}`;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          this._logger.error("requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          this._logger.error(bind, " is already in use");
          process.exit(1);
          break;

        default:
          throw error;
      }
    });

    // start listening on port
    this.express_server.on("listening", () => {
      this._logger.info("Server ready. Listening on port ", this.port);
      this._logger.info("Server started at " + new Date());
    });

  }

}
// Bootstrap the server
const server = Server.bootstrap();
exports.express_server = server.express_server;
exports.app = server.app;
