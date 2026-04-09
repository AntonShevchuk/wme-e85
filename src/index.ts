import { NAME } from './name'
import { TRANSLATION } from './translations'
import { SETTINGS, getButtons } from './settings'
import { E85 } from './e85'
import style from './style.css'

$(document).on('bootstrap.wme', () => {
  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(style)

  new E85(NAME, SETTINGS, getButtons())
})
