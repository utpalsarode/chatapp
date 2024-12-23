let apiEndpoint;
let commonApi;
let nodeApi;
let imgBucketPath;

const hostname = window.location.hostname;
if (hostname === "demo.chatapp.com") {
  apiEndpoint = "https://demo.chatapp.com/api"
  commonApi = "https://demo.chatapp.com"
  nodeApi = 'https://demo.chatapp.com/'
  imgBucketPath = "https://apps-bucket.nyc3.digitaloceanspaces.com/"
} else if (hostname === "localhost") {
  /* this for local*/
  apiEndpoint = 'http://localhost:5000/api/auth'
  commonApi = 'http://localhost:5000/api'
  nodeApi = 'http://localhost:5000'
}

module.exports = {
  apiEndpoint,
  commonApi,
  nodeApi,
  imgBucketPath
}
