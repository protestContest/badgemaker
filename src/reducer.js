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
    titleWidth: 30,
    titleText: 'BADGE TITLE',

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

// const saveFields = ['badgeRadius','petalRadius','numPetals','petalDepth','petalOffset','width','height','borderColor','fillColor','usePetals','useTitleRing','titleColor','titleWidth','titleText','useBanner','bannerColor','bannerText','image','imageSize','imagePosition','customColors'];

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_PROPS':
      for (let prop in action.payload) {
        if (typeof action.payload[prop] === 'string' && action.payload[prop].substring(0, 5) !== 'data:') {
          action.payload[prop] = action.payload[prop].toUpperCase();
        }
      }

      return {
        ...state,
        badge: {
          ...state.badge,
          ...action.payload
        },
        isReset: false,
        canSave: true
      };
      break;

    case 'OPEN_PICKER':
      return {
        ...state,
        ui: {
          ...state.ui,
          openPicker: action.payload
        }
      };
      break;

    case 'CLOSE_PICKER':
      return {
        ...state,
        ui: {
          ...state.ui,
          openPicker: null
        }
      };
      break;

    case 'ADJUST_IMAGE':
      return {
        ...state,
        badge: {
          ...state.badge,
          imagePosition: action.payload
        }
      };
      break;

    case 'RESET':
      return {
        ...state,
        badge: defaultState.badge
      };
      break;

    case 'ADD_SAVE':
      if (!state.canSave)
        return state;
      return {
        ...state,
        saves: [...state.saves, action.payload],
        canSave: false
      };
      break;

    case 'RESTORE_SAVE':
      return {
        ...state,
        badge: action.payload,
        canSave: false
      };
      break;

    case 'DELETE_SAVE':
      const saves = state.saves.filter(save => save !== action.payload);
      return {
        ...state,
        saves
      };
      break;

    default:
      return state;
  }
};
