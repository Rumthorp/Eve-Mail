import axios from 'axios';

const initialState = {
  authUrl: "https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogin&client_id=81577ff7ba9943ca8b95aef5656bc783&scope=esi%2Dmail%2Eorganize%5Fmail%2Ev1%20esi%2Dmail%2Eread%5Fmail%2Ev1%20esi%2Dmail%2Esend%5Fmail%2Ev1&state=uniquestate123",
  token: null,
  characterId: 1948822847,
  accessToken: null,
  accessTokenRefreshTime: null,
  refreshToken: null,
  mailHeaders: null,
  mailHeadersInbox: null,
  mailHeadersCorporation: null,
  mailHeadersAlliance: null,
  mailHeadersPersonal: null,
  mailHeadersSent: null,
  mailHeaderDisplay: 'mailHeadersInbox',
  auxWindowDisplay: null,
  mailRead: null,
  composeSendArray: [],
  updateStage: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
  case 'fetchHeaders':
    return Object.assign({}, state, {
      mailHeaders: action.payload.headers,
      updateStage: action.payload.updateStage
    });
  case 'fetchTokens':
    return Object.assign({}, state, {
      accessToken: action.payload.tokenData.data.access_token,
      refreshToken: action.payload.tokenData.data.refresh_token,
      updateStage: action.payload.updateStage,
      accessTokenRefreshTime: action.payload.accessTokenRefreshTime
    });
  case 'fetchCharacterNames':
    return Object.assign({}, state, {
      mailHeaders: action.payload.charNameData,
      updateStage: action.payload.updateStage
    });
  case 'sortMailHeaders':
    return Object.assign({}, state, {
      mailHeadersInbox: action.payload.inboxArray,
      mailHeadersCorporation: action.payload.corporationArray,
      mailHeadersAlliance: action.payload.allianceArray,
      mailHeadersPersonal: action.payload.personalArray,
      mailHeadersSent: action.payload.sentArray,
      updateStage: action.payload.updateStage
    });
  case 'EVE_MAIL_CHANGE_UPDATE_STAGE':
    return Object.assign({}, state, {
      updateStage: action.payload
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
  case 'EVE_MAIL_GET_NEW_ACCESS_TOKEN_WITH_REFRESH_TOKEN':
    return Object.assign({}, state, {
      accessToken: action.payload.tokenData.data.access_token,
      refreshToken: action.payload.tokenData.data.refresh_token,
      updateStage: action.payload.updateStage,
      accessTokenRefreshTime: action.payload.accessTokenRefreshTime
    });
  case 'EVE_MAIL_WRITE_TOKENS_FROM_LOCAL_STORAGE':
    return Object.assign({}, state, {
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      updateStage: action.payload.updateStage,
      accessTokenRefreshTime: action.payload.accessTokenRefreshTime
    });
  case 'EVE_MAIL_ADD_COMPOSE_SEND_ARRAY':
    return Object.assign({}, state, {
      composeSendArray: action.payload
    });
  case 'EVE_MAIL_REMOVE_COMPOSE_SEND_ARRAY':
    return Object.assign({}, state, {
      composeSendArray: action.payload
    });
  }
  return state;
}
