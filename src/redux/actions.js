import axios from 'axios';



export function fetchTokens(authCode) {
  let tokenData;
  tokenData = axios.post('/api/fetchAuthorizationCode', {
    authCode: authCode
  })
  .then((data) => {
    let tokenDataObj = {};
    tokenDataObj.tokenData = data;
    localStorage.setItem('tokens', JSON.stringify(
      {
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token
      }
    ));
    return tokenDataObj;
  });

  return {
    type: 'fetchTokens',
    payload: tokenData
  };
}



export function fetchHeaders(charId, accessToken, lastHeader) {
  let newAuthToken = 'Bearer ' + accessToken;
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



export function fetchUserCharacterInfo (accessToken) {
  let userCharacterInfo = axios({
    method: 'get',
    url: 'https://login.eveonline.com/oauth/verify',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      Host: 'login.eveonline.com',
      "Content-Type": 'application/json'
    }
  })
  .then((data) => {
    console.log(data);
  })

  return {
    type: 'fetchUserCharacterInfo',
    payload: null
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
    let charNameDataObj = {};
    charNameDataObj.charNameData = refinedData;
    return charNameDataObj;
  });

  return {
    type: 'fetchCharacterNames',
    payload: charNameData
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
  let tokenData = axios.post('/api/getNewAccessTokenWithRefreshToken', {
    refreshToken: refreshToken
  })
  .then((data) => {
    let tokenDataObj = {};
    tokenDataObj.tokenData = data;
    localStorage.setItem('tokens', JSON.stringify(
      {
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token
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



export function initialLoad (accessToken, refreshToken) {
  return (dispatch, getState) => {
    if (getState().eveMail.accessToken == null || getState().eveMail.refreshToken == null) {
      dispatch(copyTokenDataFromLocalStorageToRedux(accessToken, refreshToken));
    }
    dispatch(getNewAccessTokenWithRefreshToken(getState().eveMail.refreshToken))
    .then(() => {
      dispatch(updateTokenIntervalStatus('start interval'));
      return dispatch(fetchUserCharacterInfo(getState().eveMail.accessToken))
    })
    .then(() => {
      return dispatch(fetchHeaders(getState().eveMail.characterId, getState().eveMail.accessToken));
    })
    .then(() => {
      return dispatch(fetchCharacterNames(getState().eveMail.rawMailHeaders));
    })
    .then(() => {
      dispatch(initialLoadComplete());
    })
  }
}
