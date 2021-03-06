import axios from 'axios';

const initialState = {
  characterId: null,
  characterName: null,
  accessToken: null,
  refreshToken: null,
  tokenIntervalStatus: null,
  initialLoadComplete: false,
  fetchHeaderCycleStatus: 'busy',
  pageSetLoading: false,
  rawMailHeaders: [],
  mailHeaders: [],
  filteredMailHeaders: [],
  mailBodies: {},
  page: 1,
  maxPage: 1,
  selectedMailBody: null,
  filter: 'inbox',
  composeView: 'closed',
  sendArray: [],
  subject: null,
  message: null,
  nameSearchVisible: false,
  nameSearchBusy: false,
  nameSearchResults: null
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
  case 'updateFetchHeaderCycleStatus':
    return Object.assign({}, state, {
      fetchHeaderCycleStatus: action.payload
    });
  case 'fetchCharacterNames':
    return Object.assign({}, state, {
      rawMailHeaders: action.payload.charNameData
    });
  case 'replaceMailHeadersWithRawMailHeaders':
    let replacedMailHeaders = state.mailHeaders.slice();
    replacedMailHeaders = replacedMailHeaders.concat(action.payload)
    return Object.assign({}, state, {
      mailHeaders: replacedMailHeaders
    })
  case 'emptyRawMailHeaders':
    return Object.assign({}, state, {
      rawMailHeaders: action.payload
    })
  case 'emptyMailHeaders':
    return Object.assign({}, state, {
      mailHeaders: action.payload
    })
  case 'updateFilter':
    return Object.assign({}, state, {
      filter: action.payload
    })
  case 'updateFilteredMailHeaders':
    return Object.assign({}, state, {
      filteredMailHeaders: action.payload
    })
  case 'sortMailHeaders':
    return Object.assign({}, state, {
      mailHeadersInbox: action.payload.inboxArray,
      mailHeadersCorporation: action.payload.corporationArray,
      mailHeadersAlliance: action.payload.allianceArray,
      mailHeadersPersonal: action.payload.personalArray,
      mailHeadersSent: action.payload.sentArray
    });
  case 'addMailBodyAndHeaderToSelectedMailBody':
    return Object.assign({}, state, {
      selectedMailBody: action.payload
    })
  case 'makeSelectedMailBodyNull':
    return Object.assign({}, state, {
      selectedMailBody: action.payload
    })
  case 'fetchMailBody':
    let newMailBodies = state.mailBodies;
    newMailBodies[action.payload.mailId] = action.payload.mailItem;
    return Object.assign({}, state, {
      mailBodies: newMailBodies
    });
  case 'deleteMailWithApiCall':
    return Object.assign({}, state);
  case 'deleteHeader':
    let newMailHeaders = state.mailHeaders.filter((ele, ind) => ind !== action.payload);
    let newFilteredMailHeaders = state.filteredMailHeaders.filter((ele, ind) => ind !== action.payload);
    return Object.assign({}, state, {
      mailHeaders: newMailHeaders,
      filteredMailHeaders: newFilteredMailHeaders
    })
  case 'deleteMailBody':
    let copy = Object.assign({}, state);
    delete copy.mailBodies[action.payload];
    return copy;
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
  case 'updateComposeView':
    return Object.assign({}, state, {
      composeView: action.payload
    });
  case 'updateTokenIntervalStatus':
    return Object.assign({}, state, {
      tokenIntervalStatus: action.payload
    });
  case 'initialLoadComplete':
    return Object.assign({}, state, {
      initialLoadComplete: action.payload
    })
  case 'updateNameSearchVisible':
    return Object.assign({}, state, {
      nameSearchVisible: action.payload
    })
  case 'updateNameSearchBusy':
    return Object.assign({}, state, {
      nameSearchBusy: action.payload
    })
  case 'pushSendArray':
    let newSendArray = [...state.sendArray];
    newSendArray.push(action.payload);
    return Object.assign({}, state, {
      sendArray: newSendArray
    })
  case 'removeSendArray':
    let newSendArray2 = state.sendArray.filter((ele, ind) => ind !== action.payload);
    return Object.assign({}, state, {
      sendArray: newSendArray2
    })
  case 'nameSearch':
    return Object.assign({}, state, {
      nameSearchResults: action.payload
    })
  case 'updateSubject':
    return Object.assign({}, state, {
      subject: action.payload
    })
  case 'updateMessage':
    return Object.assign({}, state, {
      message: action.payload
    })
  case 'setPage':
    return Object.assign({}, state, {
      page: action.payload
    })
  case 'setMaxPage':
    return Object.assign({}, state, {
      maxPage: action.payload
    })
  }
  return state;
}
