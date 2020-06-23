const Logger = require('./logger');
const log = new Logger().getLogger('helper-http-service');
const axios = require('axios');
const {
  to
} = require('await-to-js');
const ErrorHandler = require('./error-handler')

module.exports = class AxiosService {
  constructor(url = global.conf.backendService.host) {
      let auth = "Basic " + Buffer.from(global.conf.authentication.username + ":" + global.conf.authentication.password, "ascii").toString("base64");
      this.axiosInstance = axios.create({
        baseURL: url,
        timeout: global.conf.request_timeout,
        headers: {
          'Authorization': auth
        }
      });
  }
  async get(query, params) {
    if(params){
      params = JSON.parse(params)
      let [err, result] = await to(this.axiosInstance.get(query, {
        params
      }));
      ErrorHandler.handleError(err);
      return result;
    }
    let [err, result] = await to(this.axiosInstance.get(query));
    ErrorHandler.handleError(err);
    return result;
  }
  async post(path, data) {
    let [err, result] = await to(this.axiosInstance.post(path, data));
    ErrorHandler.handleError(err);
    return result;
  }
  async put(path, data) {
    let [err, result] = await to(this.axiosInstance.put(path, data));
    ErrorHandler.handleError(err);
    return result;
  }
  async delete (path, data){
    let [err, result] = await to(this.axiosInstance.delete(path, data));
    ErrorHandler.handleError(err);
    return result;
  }
  getAuthorizationQueryPath(userId, path, auth) {
    if (!userId) {
      return path;
    }
    path = `${path}?user_id=${userId}`;
    auth = auth && Object.keys(auth).length ? JSON.parse(auth) : null
    let page = auth ? auth.page : "";
    let key = auth ? auth.key : "";
    if (page) {
      path = `${path}&page=${page}`;
    }
    if (key) {
      path = `${path}&permission_key=${key}`;
    }
    return path;
  } 
}
