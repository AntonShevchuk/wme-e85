import { NAME } from './translations'

export function getButtons () {
  return {
    A: {
      title: I18n.t(NAME).buttons.A,
      description: I18n.t(NAME).buttons.A,
      shortcut: null,
    },
    B: {
      title: I18n.t(NAME).buttons.B,
      description: I18n.t(NAME).buttons.B,
      shortcut: null,
    },
    H: {
      title: I18n.t(NAME).buttons.H,
      description: I18n.t(NAME).buttons.H,
      shortcut: null,
    },
  }
}

export const SETTINGS = {
  simplify: {
    short: 5,
    angle: 176,
    twoShort: 50,
  },
  buttons: {
    C: 180,
    D: 90,
    E: 60,
    F: 30,
    G: 15,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
  },
  microDoglegs: {
    enabled: false,
    maxDistance: 3,
    minDistance: 0,
  }
}
