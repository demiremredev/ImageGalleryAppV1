const Logger = require('./logger');
const logger = new Logger().getLogger('utils-error-handler');
module.exports = class ErrorHandler {
    constructor() {
    }

    /**
     * Handles error through the system and throws if required
     * @param {Error} err checks if error is already handled
     */
    static handleError(err) {
        if (!err) {
            return;
        }

        if (err instanceof Error) {
            if (err.handled) {
                throw err;
            }

            err.handled = true;
            let message = err.response && err.response.data ?
                err.response.data : err
              logger.error("Handled error:", message);
            throw err;
        }

        let msg = typeof err === "string" ? err : "Something went wrong and handled.";
        logger.error(msg);
        let hError = new Error(msg);
        hError.handled = true;
        throw hError;
    }
}
