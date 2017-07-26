import axios from 'axios';

const initialState = {
  authUrl: "https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogin&client_id=81577ff7ba9943ca8b95aef5656bc783&scope=esi%2Dmail%2Eorganize%5Fmail%2Ev1%20esi%2Dmail%2Eread%5Fmail%2Ev1%20esi%2Dmail%2Esend%5Fmail%2Ev1&state=uniquestate123",
  token: null,
  characterId: 1948822847,
  accessToken: null,
  refreshToken: null,
  tokensAreReady: false,
  initialLoadComplete: false,
  mailHeaders: null,
  mailHeadersInbox: null,
  mailHeadersCorporation: null,
  mailHeadersAlliance: null,
  mailHeadersPersonal: null,
  mailHeadersSent: null,
  mailHeaderDisplay: 'mailHeadersInbox',
  auxWindowDisplay: null,
  mailRead: null,
  composeSendArray: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  case 'fetchHeaders':
    return Object.assign({}, state, {
      mailHeaders: action.payload.headers
    });
  case 'fetchTokens':
    return Object.assign({}, state, {
      accessToken: action.payload.tokenData.data.access_token,
      refreshToken: action.payload.tokenData.data.refresh_token,
      accessTokenRefreshTime: action.payload.accessTokenRefreshTime
    });
  case 'fetchCharacterNames':
    return Object.assign({}, state, {
      mailHeaders: action.payload.charNameData
    });
  case 'sortMailHeaders':
    return Object.assign({}, state, {
      mailHeadersInbox: action.payload.inboxArray,
      mailHeadersCorporation: action.payload.corporationArray,
      mailHeadersAlliance: action.payload.allianceArray,
      mailHeadersPersonal: action.payload.personalArray,
      mailHeadersSent: action.payload.sentArray
    });
  case 'EVE_MAIL_GET_MAIL_BODY':
    return Object.assign({}, state, {
      mailRead: action.payload
    });
  case 'EVE_MAIL_MAIL_HEADER_DISPLAY_CHANGE':
    return Object.assign({}, state, {
      mailHeaderDisplay: action.payload
    });
  case 'EVE_MAIL_AUX_WINDOW_DISPLAY_CHANGE':
    return Object.assign({}, state, {
      auxWindowDisplay: action.payload
    });
  case 'getNewAccessTokenWithRefreshToken':
    return Object.assign({}, state, {
      accessToken: action.payload.tokenData.data.access_token,
      refreshToken: action.payload.tokenData.data.refresh_token,
      accessTokenRefreshTime: action.payload.accessTokenRefreshTime
    });
  case 'copyTokenDataFromLocalStorageToRedux':
    return Object.assign({}, state, {
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken
    });
  case 'EVE_MAIL_ADD_COMPOSE_SEND_ARRAY':
    return Object.assign({}, state, {
      composeSendArray: action.payload
    });
  case 'EVE_MAIL_REMOVE_COMPOSE_SEND_ARRAY':
    return Object.assign({}, state, {
      composeSendArray: action.payload
    });
  case 'tokensAreReady':
    return Object.assign({}, state, {
      tokensAreReady: action.payload
    });
  case 'initialLoadComplete':
    return Object.assign({}, state, {
      initialLoadComplete: action.payload
    })
  }
  return state;
}
