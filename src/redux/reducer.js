import axios from 'axios';

const initialState = {
  characterId: null,
  characterName: null,
  accessToken: null,
  refreshToken: null,
  tokenIntervalStatus: null,
  initialLoadComplete: false,
  rawMailHeaders: null,
  mailHeaders: null,
  mailBodies: null,
  inboxFilter: null,
  auxWindowDisplay: null,
  mailRead: null,
  composeSendArray: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  case 'fetchTokens':
    return Object.assign({}, state, {
      accessToken: action.payload.tokenData.data.access_token,
      refreshToken: action.payload.tokenData.data.refresh_token
    });
  case 'fetchUserCharacterInfo':
    return Object.assign({}, state, {
      characterId: action.payload.characterId,
      characterName: action.payload.characterName
    })
  case 'fetchHeaders':
    return Object.assign({}, state, {
      rawMailHeaders: action.payload.headers
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
      refreshToken: action.payload.tokenData.data.refresh_token
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
  case 'updateTokenIntervalStatus':
    return Object.assign({}, state, {
      tokenIntervalStatus: action.payload
    });
  case 'initialLoadComplete':
    return Object.assign({}, state, {
      initialLoadComplete: action.payload
    })
  }
  return state;
}
