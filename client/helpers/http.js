import axios from 'axios';

function _getAuthorization() {
  let appUser = window.localStorage.getItem('app-token');

  appUser = appUser
    ? JSON.parse(appUser)
    : null;

  console.log('@@@@@@@', appUser);

  return appUser && appUser.token
  ? appUser.token
  : null;
}

function _getConfig() {
  const token = _getAuthorization();
  return {
    headers : {
      "Content-Type" : "application/json",
      Authorization : token ? `Bearer ${token}` : null,
    },
  };
}

export function get(url) {
  return axios.get(url, _getConfig());
}

export function post(url, data) {
  return axios.post(url, data, _getConfig());
}

export function put(url, data) {
  return axios.put(url, data, _getConfig());
}

export function _delete(url) {
  return axios.delete(url, _getConfig());
}

export default {
    get,
    post,
    put,
    delete : _delete,
};
