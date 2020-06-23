
export default function ({ $axios }) {

  if (process.server) {
    return
  }

  var $loading = null;
  var $notify = null
  window.onNuxtReady(() => {
    $loading = window.$nuxt.$loading;
    $notify = window.$nuxt.$showNotification
  })

  function startLoading() {
    if ($loading) {
      $loading.start();
    }
  }

  function stopLoading() {
    if ($loading) {
      $loading.finish();
    }
  }

  let currentRequests = 0


  $axios.onRequest(config => {
    startLoading();
    currentRequests++;
    config.headers["client"] = "1";
    config.xsrfHeaderName = "X-XSRF-TOKEN";
    config.xsrfCookieName = "csrftoken";
    config.withCredentials = true; // default
    config.timeout = 1 * 60 * 1000
    // console.log('Making request to ' + config.url)
  })

  $axios.onResponse(response => {

    let message = response && response.data && response.data.message ? response.data.message : ""
    let title = response && response.data && response.data.title ? response.data.title : "Success"
    if(message){
      if($notify) {
        $notify(message, false, 'success');
      }
    }
    currentRequests--;
    if (currentRequests <= 0) {
      currentRequests = 0
      stopLoading();
    }
  })

  $axios.onError(error => {
    currentRequests--;
    stopLoading();
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      window.location = error.response.data && error.response.data.redirectUrl ? error.response.data.redirectUrl : `/login`
      return;
    }
    if (code === 403) {
      window.location = error.response.data && error.response.data.redirectUrl ? error.response.data.redirectUrl : "/forbidden"
      return;
    }
    let message = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Something went wrong, please try again later"
    let title = error.response && error.response.data && error.response.data.title ? error.response.data.title : "Error"
    if($notify) {
      $notify(message, false, 'danger');
    }
    return Promise.resolve({ code, message, handled: true });
  })
}