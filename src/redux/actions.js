import axios from 'axios';



export function fetchTokens(authCode) {
  let tokenData;
  tokenData = axios.post('/api/fetchAuthorizationCode', {
    authToken: authCode,
    encodedClientSecret: process.env.REACT_APP_EVE_MAIL_ENCODED_CLIENT_AND_SECRET
  })
  .then((data) => {
    let tokenDataObj = {};
    let accessTokenRefreshTime = Date.now() + 900000;
    tokenDataObj.tokenData = data;
    tokenDataObj.accessTokenRefreshTime = accessTokenRefreshTime;
    localStorage.setItem('tokens', JSON.stringify(
      {
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token,
        accessTokenRefreshTime: accessTokenRefreshTime
      }
    ));
    return tokenDataObj;
  });

  return {
    type: 'fetchTokens',
    payload: tokenData
  };
}



export function fetchHeaders(charId, authToken, lastHeader) {

  if (localStorage.getItem('mailHeaders') && force == false) {
    let mailHeaders = {};
    mailHeaders.headers = JSON.parse(localStorage.getItem('mailHeaders'));

    return {
      type: EVE_MAIL_FETCH_HEADERS,
      payload: mailHeaders
    };
  } else {
    let newAuthToken = 'Bearer ' + authToken;
    let baseUrl = 'https://esi.tech.ccp.is/latest/characters/' + charId + '/mail/?';
    if (lastHeader) {
      baseUrl = baseUrl + 'last_mail_id=' + lastHeader + '&datasource=tranquility';
    } else {
      baseUrl += '?datasource=tranquility';
    }
    let mailHeaders = axios({
      method: 'get',
      url: baseUrl,
      headers: {
        Authorization: newAuthToken,
        Accept: 'application/json'
      }
    })
    .then((data) => {
      let headerObj = {};
      headerObj.headers = data.data;
      return headerObj;
    });

    return {
      type: 'fetchHeaders',
      payload: mailHeaders
    };
  }
}



export function fetchCharacterNames (headerData) {
  let refinedData = headerData;
  let idStr = '';
  refinedData.forEach((ele, ind, arr) => {
    if (ind == arr.length -1) {
      idStr += ele.from;
    } else {
      idStr = idStr + ele.from + '%2C';
    }
  });
  let url = 'https://esi.tech.ccp.is/latest/characters/names/?character_ids=';
  url = url + idStr + '&datasource=tranquility';
  let charNameData = axios({
    method: 'get',
    url: url,
    headers: {
      Accept: 'application/json'
    }
  })
  .then((data) => {
    let nameData = data.data;
    refinedData.forEach((ele, ind, arr) => {
      ele.from = nameData[ind].character_name;
    });
    localStorage.setItem('mailHeaders', JSON.stringify(refinedData));
    let charNameDataObj = {};
    charNameDataObj.charNameData = refinedData;
    return charNameDataObj;
  });

  return {
    type: 'fetchCharacterNames',
    payload: charNameData
  };
}



export function sortMailHeaders (mailHeaders) {
  let mailHeaderObj = {sentArray: [], corporationArray: [], allianceArray: [], personalArray: [], inboxArray: [], updateStage: updateStage};
  mailHeaders.forEach((ele) => {
    if (ele.from == 'Barten Lancaster') {
      mailHeaderObj.sentArray.push(ele);
    } else if (ele.recipients[0].recipient_type == 'character') {
      mailHeaderObj.personalArray.push(ele);
      mailHeaderObj.inboxArray.push(ele);
    } else if (ele.recipients[0].recipient_type == 'alliance') {
      mailHeaderObj.allianceArray.push(ele);
      mailHeaderObj.inboxArray.push(ele);
    } else if (ele.recipients[0].recipient_type == 'corporation') {
      mailHeaderObj.corporationArray.push(ele);
      mailHeaderObj.inboxArray.push(ele);
    }
  });

  return {
    type: 'sortMailHeaders',
    payload: mailHeaderObj
  };
}



export function eveMailGetMailBody (charId, authToken, mailId, from) {
  let url = `https://esi.tech.ccp.is/latest/characters/${charId}/mail/${mailId}/?datasource=tranquility`;
  let authorization = `Bearer ${authToken}`;
  let mailItem = axios({
    method: 'get',
    url: url,
    headers: {
      Accept: 'application/json',
      Authorization: authorization
    }
  })
  .then((data) => {
    let mailItem = data.data;
    mailItem.from = from;
    return mailItem;
  });

  return {
    type: EVE_MAIL_GET_MAIL_BODY,
    payload: mailItem
  };
}



export function eveMailMailHeaderDisplayChange (str) {
  return {
    type: 'EVE_MAIL_MAIL_HEADER_DISPLAY_CHANGE',
    payload: str
  };
}



export function eveMailAuxWindowDisplayChange (str) {
  return {
    type: 'EVE_MAIL_AUX_WINDOW_DISPLAY_CHANGE',
    payload: str
  };
}



export function getNewAccessTokenWithRefreshToken (refreshToken) {
  let tokenData = axios.post('/api/fetchAuthorizationCodeWithRefreshToken', {
    refreshToken: refreshToken,
    encodedClientSecret: process.env.REACT_APP_EVE_MAIL_ENCODED_CLIENT_AND_SECRET
  })
  .then((data) => {
    let tokenDataObj = {};
    tokenDataObj.tokenData = data;
    tokenDataObj.accessTokenRefreshTime = Date.now() + 900000;
    localStorage.setItem('tokens', JSON.stringify(
      {
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token,
        accessTokenRefreshTime: tokenDataObj.accessTokenRefreshTime
      }
    ));
    return tokenDataObj;
  });
  return {
    type: 'getNewAccessTokenWithRefreshToken',
    payload: tokenData
  };
}



export function copyTokenDataFromLocalStorageToRedux (accessToken, refreshToken) {
  let tokenDataObj = {};
  tokenDataObj.accessToken = accessToken;
  tokenDataObj.refreshToken = refreshToken;

  return {
    type: 'copyTokenDataFromLocalStorageToRedux',
    payload: tokenDataObj
  };
}



export function eveMailAddComposeSendArray (itemToAdd, array) {
  let newArray = array;
  newArray.push(itemToAdd);

  return {
    type: 'EVE_MAIL_ADD_COMPOSE_SEND_ARRAY',
    payload: newArray
  };
}



export function eveMailRemoveComposeSendArray (ind, composeSendArray) {
  let newArray = composeSendArray;
  newArray.splice(ind, 1);

  return {
    type: 'EVE_MAIL_REMOVE_COMPOSE_SEND_ARRAY',
    payload: newArray
  };
}



export function updateTokenIntervalStatus (status) {
  return {
    type: 'updateTokenIntervalStatus',
    payload: status
  }
}



export function initialLoadComplete () {
  return {
    type: 'initialLoadComplete',
    payload: true
  }
}



export function initialTokenFetch (refreshToken) {
  return (dispatch) => {
    dispatch(getNewAccessTokenWithRefreshToken(refreshToken));
    dispatch(tokensAreReady());
  }
}



export function initialLoad (accessToken, refreshToken) {
  return (dispatch, getState) => {

    dispatch(copyTokenDataFromLocalStorageToRedux(accessToken, refreshToken))
    dispatch(fetchAuthorizationCodeWithRefreshToken(getState().refreshToken))
    dispatch(tokensAreReady('start interval'))
    dispatch(fetchHeaders(getState().characterId, getState().accessToken));
    dispatch(fetchCharacterNames(getState().mailHeaders));
    dispatch(sortMailHeaders(getState().mailHeaders));
    dispatch(initialLoadComplete())
  }
}
