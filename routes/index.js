const router = require("express").Router();
const path = require("path");
const axios = require("axios");



router.route('/api/fetchUserCharacterInfo')
.post((req, res) => {
  axios({
    method: 'get',
    url: 'https://login.eveonline.com/oauth/verify',
    headers: {
      Authorization: 'Bearer ' + req.body.accessToken
    }
  })
  .then((data) => {
    res.send(data.data)
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});



router.route('/api/getNewAccessTokenWithRefreshToken')
.post((req, res) => {
  let encodedClientSecret = req.body.encodedClientSecret;
  axios({
    method: 'post',
    url: 'https://login.eveonline.com/oauth/token',
    headers: {
      Authorization: encodedClientSecret,
      Host: 'login.eveonline.com',
      "Content-Type": 'application/json'
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: req.body.refreshToken
    }
  })
  .then((data) => {
    res.send(data.data);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});



router.route('/api/fetchAuthorizationCode')
.post((req, res) => {
  let encodedClientSecret = req.body.encodedClientSecret;
  axios({
    method: 'post',
    url: 'https://login.eveonline.com/oauth/token',
    headers: {
      Authorization: encodedClientSecret,
      Host: 'login.eveonline.com',
      "Content-Type": 'application/json'
    },
    params: {
      grant_type: 'authorization_code',
      code: req.body.authCode
    }
  })
  .then((data) => {
    res.send(data.data);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});



module.exports = router;
