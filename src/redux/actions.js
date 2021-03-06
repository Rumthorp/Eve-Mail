import axios from 'axios';



export function fetchTokens (authCode) {
  let tokenData;
  tokenData = axios.post('/api/fetchAuthorizationCode', {
    authCode: authCode,
    encodedClientSecret: process.env.REACT_APP_EVE_MAIL_ENCODED_CLIENT_AND_SECRET
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



export function fetchHeaders (charId, accessToken, lastHeader) {
  let newAuthToken = 'Bearer ' + accessToken;
  let baseUrl = 'https://esi.tech.ccp.is/latest/characters/' + charId + '/mail/?';
  if (lastHeader) {
    baseUrl = baseUrl + 'datasource=tranquility' + '&last_mail_id=' + lastHeader;
  } else {
    baseUrl += 'datasource=tranquility';
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
  let userCharacterInfo = axios.post('/api/fetchUserCharacterInfo', {
    accessToken: accessToken
  })
  .then((data) => {
    let userCharacterInfo = {};
    userCharacterInfo.characterId = data.data.CharacterID;
    userCharacterInfo.characterName = data.data.CharacterName;
    return userCharacterInfo;
  })
  return {
    type: 'fetchUserCharacterInfo',
    payload: userCharacterInfo
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



export function replaceMailHeadersWithRawMailHeaders (rawMailHeaders) {
  return {
    type: 'replaceMailHeadersWithRawMailHeaders',
    payload: rawMailHeaders
  }
}



export function emptyRawMailHeaders () {
  return {
    type: 'emptyRawMailHeaders',
    payload: []
  }
}



export function emptyMailHeaders () {
  return {
    type: 'emptyMailHeaders',
    payload: []
  }
}



export function addMailBodyAndHeaderToSelectedMailBody (body, header, mailId, headerIndex) {
  let bodyHeaderObj = {header: header, body: body, mailId: mailId, headerIndex: headerIndex};
  return {
    type: 'addMailBodyAndHeaderToSelectedMailBody',
    payload: bodyHeaderObj
  }
}



export function makeSelectedMailBodyNull () {
  return {
    type: 'makeSelectedMailBodyNull',
    payload: null
  }
}



export function fetchMailBody (charId, accessToken, mailId) {
  let url = `https://esi.tech.ccp.is/latest/characters/${charId}/mail/${mailId}/?datasource=tranquility`;
  let authorization = `Bearer ${accessToken}`;
  let mailItem = axios({
    method: 'get',
    url: url,
    headers: {
      Accept: 'application/json',
      Authorization: authorization
    }
  })
  .then((data) => {
    let mailObj = {mailItem: data.data, mailId: mailId};
    return mailObj;
  });

  return {
    type: 'fetchMailBody',
    payload: mailItem
  };
}



export function updateComposeView (status) {
  return {
    type: 'updateComposeView',
    payload: status
  }
}



export function deleteMailWithApiCall (characterId, mailId, accessToken) {
  let url = `https://esi.tech.ccp.is/latest/characters/${characterId}/mail/${mailId}/?datasource=tranquility`;
  let authorization = `Bearer ${accessToken}`;
  let deleteConfirmation = axios({
    method: 'delete',
    url: url,
    headers: {
      Accept: 'application/json',
      Authorization: authorization
    }
  })
  .then((data) => {
    return {success: true};
  })
  .catch((err) => {
    return {success: false};
  })

  return {
    type: 'deleteMailWithApiCall',
    payload: deleteConfirmation
  }
}



export function deleteHeader (headerIndex) {
  return {
    type: 'deleteHeader',
    payload: headerIndex
  }
}



export function deleteMailBody (mailId) {
  return {
    type: 'deleteMailBody',
    payload: mailId
  }
}



export function getNewAccessTokenWithRefreshToken (refreshToken) {
  let tokenData = axios.post('/api/getNewAccessTokenWithRefreshToken', {
    refreshToken: refreshToken,
    encodedClientSecret: process.env.REACT_APP_EVE_MAIL_ENCODED_CLIENT_AND_SECRET
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



export function updateNameSearchVisible (status) {
  return {
    type: 'updateNameSearchVisible',
    payload: status
  }
}



export function updateNameSearchBusy (status) {
  return {
    type: 'updateNameSearchBusy',
    payload: status
  }
}



export function pushSendArray (person) {
  return {
    type: 'pushSendArray',
    payload: person
  }
}



export function pushSendArrayThunk (person) {
  return (dispatch, getState) => {
    let test = getState().eveMail.sendArray.find((ele) => ele.character_id === person.character_id)
    if (!test) {
      dispatch(pushSendArray(person));
    }
  }
}



export function removeSendArray (index) {
  return {
    type: 'removeSendArray',
    payload: index
  }
}



export function nameSearch (name) {
  let url = 'https://esi.tech.ccp.is/latest/search/?search=' + name + '&categories=character&language=en-us&strict=false&datasource=tranquility';

  let nameSearchResults = axios({
    method: 'get',
    url: url,
    headers: {
      Accept: 'application/json'
    }
  })
  .then((data) => {
    let secondUrl = 'https://esi.tech.ccp.is/latest/characters/names/?character_ids=';
    let charIdArray = data.data.character;
    let idStr = '';
    charIdArray.forEach((ele, ind, arr) => {
      if (ind === arr.length -1) {
        idStr += ele;
      } else {
        idStr = idStr + ele + '%2C';
      }
    });
    secondUrl = secondUrl + idStr + '&datasource=tranquility';
    return axios({
      method: "get",
      url: secondUrl,
      headers: {
        Accept: 'application/json'
      }
    })
    .then((data) => {
      return data.data;
    })
  })

  return {
    type: 'nameSearch',
    payload: nameSearchResults
  }
}



export function updateSubject (subject) {
  return {
    type: 'updateSubject',
    payload: subject
  }
}



export function updateMessage (message) {
  return {
    type: 'updateMessage',
    payload: message
  }
}



export function sendMail (message, subject, characterId, accessToken, sendArray) {
  let url = 'https://esi.tech.ccp.is/latest/characters/' + characterId + '/mail/?datasource=tranquility';
  let accessTokenString = 'Bearer ' + accessToken;
  let recipientsArray = [];
  sendArray.forEach((ele) => {
    let newRecipient = {"recipient_id": ele.character_id, "recipient_type": "character" };
    recipientsArray.push(newRecipient);
  });
  let payload = axios({
    "method": "post",
    "url": url,
    "headers": {
      "Authorization": accessTokenString,
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    },
    data: {
      "approved_cost": 0,
      "body": message,
      "recipients": recipientsArray,
      "subject": subject
    }
  })

  return {
    type: 'sendMail',
    payload: payload
  }
}



export function updateFetchHeaderCycleStatus (status) {
  return {
    type: 'updateFetchHeaderCycleStatus',
    payload: status
  }
}



export function logout () {
  localStorage.clear();

  return {
    type: 'logout',
    payload: null
  }
}



export function updateFilterAndFilteredArrayChain (filter) {
  return (dispatch, getState) => {
    if (!filter) {
      filter = getState().eveMail.filter;
    }

    if (filter !== getState().eveMail.filter) {
      dispatch(setPage(Number.NEGATIVE_INFINITY));
    }

    dispatch({type: 'updateFilter', payload: filter});
    dispatch(updateFilteredMailHeaders(filter, getState().eveMail.mailHeaders));
    dispatch(findMaxPageThunk());
  }
}

function updateFilteredMailHeaders (filter, mailHeaders) {
  let filteredMailHeaders;

  if (filter === 'inbox') {
    filteredMailHeaders = mailHeaders.filter((ele) => {
      let recipientType = ele.recipients[0].recipient_type;
      return recipientType === 'character' || recipientType === 'alliance' || recipientType === 'corporation';
    })
  } else {
    filteredMailHeaders = mailHeaders.filter((ele) => {
      return ele.recipients[0].recipient_type === filter;
    })
  }

  return {
    type: 'updateFilteredMailHeaders',
    payload: filteredMailHeaders
  }
}



export function setPage (num) {
  return (dispatch, getState) => {
    let currentPage = getState().eveMail.page;
    let maxPage = getState().eveMail.maxPage;
    let newCurrentPage = currentPage + num;

    if (newCurrentPage <= 0) {
      newCurrentPage = 1;
    }

    if (newCurrentPage > maxPage) {
      newCurrentPage = maxPage;
    }

    dispatch({type: 'setPage', payload: newCurrentPage})
  }
}



export function findMaxPageThunk () {
  return (dispatch, getState) => {
    let mailHeaderCount = getState().eveMail.filteredMailHeaders.length;
    let maxNumberOfPages;

    if (mailHeaderCount >= 50) {
      maxNumberOfPages = Math.floor(mailHeaderCount / 50)
      if (mailHeaderCount % 50 !== 0) {
        maxNumberOfPages += 1
      }
    } else {
      maxNumberOfPages = 1;
    }

    dispatch({type: 'setMaxPage', payload: maxNumberOfPages});
  }
}



export function refreshHeaderChain () {
  return (dispatch, getState) => {
    dispatch(updateFetchHeaderCycleStatus('busy'));
    dispatch(emptyMailHeaders());
    helperFetchHeaderChain(dispatch, getState, 50);
  }
}



export function fetchHeaderChain () {
  return (dispatch, getState) => {
    dispatch(updateFetchHeaderCycleStatus('busy'));
    helperFetchHeaderChain(dispatch, getState, 50);
  }
}

function helperFetchHeaderChain (dispatch, getState, newMailCount) {
  let lastHeaderId;
  let headers = getState().eveMail.mailHeaders;
  if (headers[headers.length - 1]) {
    lastHeaderId = headers[headers.length - 1].mail_id;
  }

  dispatch(fetchHeaders(getState().eveMail.characterId, getState().eveMail.accessToken, lastHeaderId))
  .then(() => {
    newMailCount = getState().eveMail.rawMailHeaders.length;
    return dispatch(fetchCharacterNames(getState().eveMail.rawMailHeaders));
  })
  .then(() => {
    dispatch(replaceMailHeadersWithRawMailHeaders(getState().eveMail.rawMailHeaders));
    dispatch(updateFilteredMailHeaders(getState().eveMail.filter, getState().eveMail.mailHeaders));
    dispatch(findMaxPageThunk());
    dispatch(emptyRawMailHeaders());

    if (newMailCount !== 50) {
      dispatch(updateFetchHeaderCycleStatus('ready'));
      return;
    }

    return helperFetchHeaderChain(dispatch, getState, newMailCount)
  })
}



export function sendMailChain () {
  return (dispatch, getState) => {
    let message = getState().eveMail.message;
    let subject = getState().eveMail.subject;
    let characterId = getState().eveMail.characterId;
    let accessToken = getState().eveMail.accessToken;
    let sendArray = getState().eveMail.sendArray;

    dispatch(sendMail(message, subject, characterId, accessToken, sendArray));
  }
}



export function nameSearchChain (name) {
  return (dispatch) => {
    dispatch(updateNameSearchBusy(true));
    dispatch(nameSearch(name))
    .then(() => {
      dispatch(updateNameSearchBusy(false));
    })
  }
}



export function deleteMail (mailId, headerIndex) {
  return (dispatch, getState) => {
    dispatch(deleteMailWithApiCall(getState().eveMail.characterId, mailId, getState().eveMail.accessToken))
    .then((data) => {
      if (data.payload.success) {
        dispatch(deleteHeader(headerIndex));
        dispatch(deleteMailBody(mailId));
      }
    })
  }
}



export function handleMailBody (mailId, headerIndex) {
  return (dispatch, getState) => {
    if (getState().eveMail.mailBodies[mailId]) {
      let header = getState().eveMail.mailBodies[mailId]
      let body = getState().eveMail.mailHeaders[headerIndex]
      dispatch(addMailBodyAndHeaderToSelectedMailBody(header, body));
    } else {
      let charId = getState().eveMail.characterId;
      let accessToken = getState().eveMail.accessToken;
      dispatch(fetchMailBody(charId, accessToken, mailId))
      .then(() => {
        let body = getState().eveMail.mailBodies[mailId];
        let header = getState().eveMail.mailHeaders[headerIndex];
        dispatch(addMailBodyAndHeaderToSelectedMailBody(body, header, mailId, headerIndex));
      })
    }
  }
}



export function refreshMailHeaders () {
  return (dispatch, getState) => {

  }
}



export function initialLoad (needNewToken) {

  return (dispatch, getState) => {
    let tokenData = JSON.parse(localStorage.getItem("tokens"));

    dispatch(getNewAccessTokenWithRefreshToken(tokenData.refreshToken))
    .then(() => {
      dispatch(updateTokenIntervalStatus('start interval'));
      return dispatch(fetchUserCharacterInfo(getState().eveMail.accessToken));
    })
    .then(() => {
      return dispatch(fetchHeaderChain())
    })
    .then(() => {
      dispatch(initialLoadComplete());
    })
  }
}
