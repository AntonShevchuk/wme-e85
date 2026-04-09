import { NAME } from './name'

export function getButtons () {
  return {
    A: {
      title: WMEUI.t(NAME).buttons.A,
      description: WMEUI.t(NAME).buttons.A,
      shortcut: null,
    },
    B: {
      title: WMEUI.t(NAME).buttons.B,
      description: WMEUI.t(NAME).buttons.B,
      shortcut: null,
    },
    M: {
      title: WMEUI.t(NAME).buttons.M,
      description: WMEUI.t(NAME).buttons.M,
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
