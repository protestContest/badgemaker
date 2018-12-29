const defaultState = {
  isReset: true,
  canSave: false,

  badge: {
    badgeRadius: 100,
    petalRadius: 17,
    numPetals: 24,
    petalDepth: 1.92,
    petalOffset: -4,
    width: 280,
    height: 280,

    borderColor: '#0074e4',
    fillColor: '#19345d',
    usePetals: true,

    useTitleRing: true,
    titleColor: '#0074e4',
    titleWidth: 35,
    titleText: 'BADGE TITLE',
    titleFontSize: 22,

    useBanner: true,
    bannerColor: '#20C063',
    bannerText: 'BANNER',

    image: null,
    imageSize: 100,
    imagePosition: { x: 0, y: 0 },

    customColors: []
  },

  ui: {
    openPicker: null
  },

  saves: []
};

export default (state = defaultState, action) => {
  let newBadgeData = {};
  switch(action.type) {
    case 'SET_PROPS':
      for (let prop in action.payload) {
        if (typeof action.payload[prop] === 'string' && action.payload[prop].substring(0, 5) !== 'data:') {
          action.payload[prop] = action.payload[prop].toUpperCase();
        }
      }

      newBadgeData = {
        ...state.badge,
        ...action.payload
      };

      return {
        ...state,
        badge: newBadgeData,
        isReset: false,
        canSave: !badgeIsSaved(newBadgeData, state.saves)
      };

    case 'OPEN_PICKER':
      return {
        ...state,
        ui: {
          ...state.ui,
          openPicker: action.payload
        }
      };

    case 'CLOSE_PICKER':
      return {
        ...state,
        ui: {
          ...state.ui,
          openPicker: null
        }
      };

    case 'ADJUST_IMAGE':
      newBadgeData = {
        ...state.badge,
        imagePosition: action.payload
      };

      return {
        ...state,
        badge: newBadgeData,
        canSave: !badgeIsSaved(newBadgeData, state.saves)
      };

    case 'RESET':
      return {
        ...state,
        badge: defaultState.badge,
        isReset: true,
        canSave: false
      };

    case 'ADD_SAVE':
      if (!state.canSave)
        return state;

      return {
        ...state,
        saves: [action.payload, ...state.saves],
        canSave: false
      };

    case 'RESTORE_SAVE':
      return {
        ...state,
        badge: action.payload,
        isReset: false,
        canSave: false
      };

    case 'DELETE_SAVE':
      const saves = state.saves.filter(save => save !== action.payload);
      return {
        ...state,
        saves,
        canSave: !badgeIsSaved(state.badge, saves)
      };

    default:
      return state;
  }
};

function badgeIsSaved(badgeData, saves) {
  let badgeIsSaved = saves.some(save => {
    return badgeDataMatches(badgeData, save.data);
  });

  return badgeIsSaved;
}

function badgeIsDefault(badgeData) {
  return badgeDataMatches(badgeData, defaultState.badge);
}

function badgeDataMatches(badgeA, badgeB) {
  for (let prop in badgeA) {
    if (badgeA[prop] !== badgeB[prop]) {
      return false;
    }
  }
  return true;
}
