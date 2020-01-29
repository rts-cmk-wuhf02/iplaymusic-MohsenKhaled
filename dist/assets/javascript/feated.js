"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var base64 = btoa("".concat(Client_ID + ":" + Client_Secret));
  var auth = "basic ".concat(base64);
  fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: "grant_type=client_credentials",
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    var accessToken = "Bearer " + json.access_token;
    fetch('https://api.spotify.com/v1/browse/featured-playlists', {
      method: 'get',
      headers: {
        'Authorization': accessToken
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data);
      var produkt_array = data.playlists.items;
      var mainElement = document.querySelector(".background_pic");
      produkt_array.forEach(function (element) {
        mainElement.innerHTML += "\n                <img src=\"".concat(element.images[0].url, "\" alt=\"\">                \n                ");
      });
    })["catch"](function (error) {
      console.error(error);
    });
  });
});