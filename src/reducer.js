const defaultState = {
  isReset: true,

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

  ui: {
    openPicker: null
  }
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_PROP':
      for (let prop in action.payload) {
        if (typeof action.payload[prop] === 'string' && action.payload[prop].substring(0, 5) !== 'data:') {
          action.payload[prop] = action.payload[prop].toUpperCase();
        }
      }

      return {
        ...state,
        ...action.payload,
        isReset: false
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
        imagePosition: action.payload
      };
      break;

    case 'RESET':
      return defaultState;
      break;

    default:
      return state;
  }
};
