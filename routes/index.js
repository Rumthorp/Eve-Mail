const router = require("express").Router();
const path = require("path");
const axios = require("axios");



router.route('/api/getNewAccessTokenWithRefreshToken')
.post((req, res) => {
  let encodedClientSecret = process.env.REACT_APP_EVE_MAIL_ENCODED_CLIENT_AND_SECRET;
  axios({
    method: "post",
    url: "https://login.eveonline.com/oauth/token",
    headers: {
      Authorization: encodedClientSecret,
      Host: 'login.eveonline.com',
      "Content-Type": 'application/json'
    },
    params: {
      grant_type: "refresh_token",
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
  let encodedClientSecret = process.env.REACT_APP_EVE_MAIL_ENCODED_CLIENT_AND_SECRET;
  axios({
    method: "post",
    url: "https://login.eveonline.com/oauth/token",
    headers: {
      Authorization: encodedClientSecret,
      Host: 'login.eveonline.com',
      "Content-Type": 'application/json'
    },
    params: {
      grant_type: "authorization_code",
      code: req.body.authCode
    }
  })
  .then((data) => {
    res.send(data.data);
  })
  .catch((err) => {
    res.sendStatus(500);
    console.log(err)
  });
});



module.exports = router;
