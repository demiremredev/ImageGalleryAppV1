/**
 *  Config manager provides loading all configurations when application is startup. Some configs gathered from environment variables,
 *  some are from static fields. When a modicifation needen, if you think, a variable is static please you should add it as static, not use ENVIRONMENT_VARIABLES!!!!
 */
module.exports = class ConfigManager {

    constructor() {
        this.backendService = this.setBackendServiceConfigs();
    }
    setBackendServiceConfigs(){
        let backendService = {}
        backendService.host = process.env.BACKEND_SERVICE_URL || "http://localhost:8085"
        return backendService
    }
    getConfigurations() {
        return {
            logLevel: process.env.LOG_LEVEL || "debug",
            application_url: process.env.APPLICATION_URL || "http://localhost:8099",
            backendService: this.backendService,
            isSecure: process.env.APPLICATION_SECURE || false,
            listenPort: process.env.PORT || 8099,
            request_timeout: 60000
        }
    }
}
