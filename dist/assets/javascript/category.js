"use strict";

/* import { lookup } from "dns"; */
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
    fetch('	https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      method: 'get',
      headers: {
        'Authorization': accessToken
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      var produkt_array = data.genres;
      var mainElement = document.getElementById("main_section");
      console.log(data);
      produkt_array.forEach(function (element) {
        mainElement.innerHTML += "\n                <button>\n                    <p>".concat(element, "</p>\n                    <img src=\"/assets/images/_ionicons_svg_ios-more.png\" alt=\"\">\n                </button>\n                ");
      });
    });

    for (var i = 0; i < 1000; i++) {}

    fetch('	https://api.spotify.com/v1/browse/categories/{category_id}/playlists', {
      method: 'get',
      headers: {
        'Authorization': accessToken
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      var produkt_array = data.categories;
      var mainElement = document.getElementById("main_section");
      console.log(data);
      produkt_array.forEach(function (element) {
        mainElement.innerHTML += "\n                    <ul>\n                        <li>".concat(element, "</li>\n                        <li><img src=\"/assets/images/_ionicons_svg_ios-arrow-forward.png\" alt=\"\"></li>\n                    </ul>\n                    ");
      });
    });
  });
});