import { NAME, TRANSLATION } from './translations'
import { SETTINGS, getButtons } from './settings'
import { E85 } from './e85'
import style from './style.css'

WMEUI.addTranslation(NAME, TRANSLATION)
WMEUI.addStyle(style)

$(document).on('bootstrap.wme', () => {
  new E85(NAME, SETTINGS, getButtons())
})
