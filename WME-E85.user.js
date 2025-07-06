// ==UserScript==
// @name         WME E85 Simplify Street Geometry
// @name:uk      WME 🇺🇦 E85 Simplify Street Geometry
// @version      0.2.8
// @description  Simplify Street Geometry, looks like fork
// @description:uk Спрощуємо та вирівнюємо геометрію вулиць
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-e85/issues
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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cmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDo3MDc5ZWFhZi0yYmFiLTQyYWQtODVkMi00MDQ0MWEyMjdmZTkiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDU4ODQ0OGYtZTI5OS00MTY2LTk2ZmQtY2Y1MDI1ZGFmM2JmIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjdlZDgzZjItYTQ3OC00MjI1LTlkOTYtNjYwZGUyMzk5ZmFhIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTWFjIE9TIgogICBHSU1QOlRpbWVTdGFtcD0iMTY3MDg0NjMzNzI5MjY2NyIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjMyIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMjoxMjoxMlQxMjo1ODo1NiswMTowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjI6MTI6MTJUMTI6NTg6NTYrMDE6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplZDRiNjEzOS1iYmU3LTQ3MzgtODZkYi1kZTYwMzk2OWM3NjciCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTWFjIE9TKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMi0xMi0xMlQxMjo1ODo1NyswMTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4PVOYgAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5gwMCzo59Ra5FgAABz9JREFUeNrtmntMVFcexz+8QXQE1GEGmFVR44NHLXEayqPBWLdpt6nUB1oXLbQ10G1KbZvQVLtAXItNY//QbBraVB7bVNpx1bGGTReycbUzhAUJ0YLSAiXKY4b3Y2GFheHuH8iFy/CYZbWyw/0mk8zvnN95/H73nN/ve869IEOGDBkyZMiQIUOGjIUIB/FfGo448DsgDohCmFBnH5YKgAHQ4cCnZDAyXpmOmnSMuYW5gqnDJNgrTB0mIbcwVyAdI+moJzrAUFZdJiwUlFWXCaRjGF0Y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
// @grant        none
// @require      https://update.greasyfork.org/scripts/389765/1090053/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1619452/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/452563/1218878/WME.js
// @require      https://update.greasyfork.org/scripts/450221/1137043/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1555446/WME-UI.js
// ==/UserScript==

/* jshint esversion: 8 */

/* global require */
/* global $, jQuery */
/* global W */
/* global I18n */
/* global OpenLayers */
/* global WME, WMEBase */
/* global WMEUI, WMEUIHelper, WMEUIHelperPanel, WMEUIHelperModal, WMEUIHelperTab, WMEUIShortcut */
/* global Container, Settings, SimpleCache, Tools  */

(function () {
  'use strict'

  // Script name, uses as unique index
  const NAME = 'E85'

  // Translations
  const TRANSLATION = {
    'en': {
      title: 'Street Geometry',
      description: 'Simplify and straighten up streets',
      buttons: {
        A: 'Simplify',
        B: 'Straighten',
      },
      settings: {
        simplify: {
          title: 'Settings',
          description: 'Settings for simplifying segments',
          short: 'Remove a fragment shorter than',
          angle: 'If the angle is bigger than',
          twoShort: 'and fragments shorter than',
        },
        buttons:{
          title: 'Buttons',
          description: 'Set the angle of the buttons',
          C: '1st Button',
          D: '2nd Button',
          E: '3rd Button',
          F: '4th Button',
        }
      },
    },
    'uk': {
      title: 'Геометрія вулиць',
      description: 'Спрощуйте та вирівнюйте вулиці',
      buttons: {
        A: 'Спростити',
        B: 'Вирівняти',
      },
      settings: {
        simplify: {
          title: 'Налаштування',
          description: 'Для спрощення сегментів будуть враховані наступні параметри',
          short: 'Видаляти фрагменти менші ніж',
          angle: 'Або якщо кут більше ніж',
          twoShort: 'та фрагменти меньші ніж',
        },
        buttons: {
          title: 'Кнопки',
          description: 'Налаштуйте кут для кнопок',
          C: 'Для першої',
          D: 'Для другої',
          E: 'Для третьої',
          F: 'Для четвертої',
        }
      },
    },
    'ru': {
      title: 'Геометрия улиц',
      description: 'Упрощайте и выравнивайте геометрию улиц',
      buttons: {
        A: 'Упростить',
        B: 'Выровнять',
      },
      settings: {
        simplify: {
          title: 'Настройки',
          description: 'Параметры для упрощения геометрии сегмента',
          short: 'Если фрагмент короче, чем',
          angle: 'Или угол больше чем',
          twoShort: 'и фрагменты меньше, чем',
        },
        buttons: {
          title: 'Кнопки',
          description: 'Настройте угол для кнопок',
          C: 'Для 1-ой кнопки',
          D: 'Для 2-ой кнопки',
          E: 'Для 3-ей кнопки',
          F: 'Для 4-ой кнопки',
        }
      },
    }
  }

  const STYLE =
    'button.e85.e85-A { background-color: #0f9; margin-right: 2px }' +
    'button.e85.e85-B { background-color: #09f; margin-right: 20px; color: #fff }' +
    'button.e85.e85-C { background-color: #fdd; margin: 2px 2px 0 0}' +
    'button.e85.e85-D { background-color: #fbb; margin: 2px 2px 0 0 }' +
    'button.e85.e85-E { background-color: #f99; margin: 2px 2px 0 0 }' +
    'button.e85.e85-F { background-color: #f77; margin: 2px 2px 0 0 }' +
    'button.e85.e85-A:disabled, button.e85.e85-B:disabled { background-color: #ccc }' +
    '.e85 legend { cursor:pointer; font-size: 12px; font-weight: bold; width: auto; text-align: right; border: 0; margin: 0; padding: 0 8px; }' +
    '.e85 fieldset { border: 1px solid #ddd; padding: 8px; }' +
    '.e85 fieldset.e85 div.controls label { white-space: normal; font-weight: normal; line-height: 32px; font-size: 13px; }' +
    '.e85 fieldset.e85 div.controls input[type="number"] { float:right; wight: 32px }' +
    'p.e85-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }'

  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(STYLE)

  const BUTTONS = {
    A: {
      title: I18n.t(NAME).buttons.A,
      description: I18n.t(NAME).buttons.A,
      shortcut: '',
    },
    B: {
      title: I18n.t(NAME).buttons.B,
      description: I18n.t(NAME).buttons.B,
      shortcut: '',
    },
  }

  // Default settings
  const SETTINGS = {
    simplify: {
      short: 5,
      angle: 176,
      twoShort: 50,
    },
    buttons: {
      C:90,
      D:60,
      E:40,
      F:30
    }
  }

  let WazeActionAddNode
  let WazeActionMoveNode
  let WazeActionMultiAction
  let WazeActionUpdateSegmentGeometry

  class E85 extends WMEBase {
    /**
     * Initial UI elements
     * @param {Object} buttons
     */
    init (buttons) {
      /** @type {WMEUIHelper} */
      this.helper = new WMEUIHelper(this.name)

      /** @type {WMEUIHelperTab} */
      this.tab = this.helper.createTab(
        I18n.t(this.name).title,
        {
          image: GM_info.script.icon
        }
      )

      // Setup options for the script
      let fieldset = this.helper.createFieldset(I18n.t(NAME).settings.simplify.title)
      fieldset.addText('description', I18n.t(NAME).settings.simplify.description)

      let simplify = this.settings.get('simplify')
      for (let item in simplify) {
        if (simplify.hasOwnProperty(item)) {
          fieldset.addNumber(
            'settings-simplify-' + item,
            I18n.t(NAME).settings.simplify[item],
            event => this.settings.set(['simplify', item], event.target.value),
            this.settings.get('simplify', item),
            (item === 'angle') ? 150 : 0,
            (item === 'angle') ? 180 : 200,
            1
          )
        }
      }

      this.tab.addElement(fieldset)


      // Setup options for the script
      let fieldsetButtons = this.helper.createFieldset(I18n.t(NAME).settings.buttons.title)
      fieldsetButtons.addText('description', I18n.t(NAME).settings.buttons.description)

      let settingsButtons = this.settings.get('buttons')
      for (let item in settingsButtons) {
        if (settingsButtons.hasOwnProperty(item)) {
          fieldsetButtons.addNumber(
            'settings-buttons-' + item,
            I18n.t(NAME).settings.buttons[item],
            event => this.settings.set(['buttons', item], event.target.value),
            this.settings.get('buttons', item),
            10,
            180,
            (item === 'F') ? 1 : 5
          )
        }
      }

      this.tab.addElement(fieldsetButtons)

      this.tab.addText(
        'info',
        '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
      )

      // Inject custom HTML to container in the WME interface
      this.tab.inject()
    }

    /**
     * Handler for `segment.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {W.model} model
     * @return {void}
     */
    onSegment (event, element, model) {
      // Skip for blocked roads
      if (model.isLockedByHigherRank() || !model.isGeometryEditable()) {
        return
      }

      let panel = this.helper.createPanel(I18n.t(this.name).title)
      let simplifyButton = panel.addButton(
        'A',
        BUTTONS.A.title,
        BUTTONS.A.description,
        () => this.simplifySegmentGeometry(model),
        BUTTONS.A.shortcut
      )

      let straightenButton = panel.addButton(
        'B',
        BUTTONS.B.title,
        BUTTONS.B.description,
        () => this.straightenSegmentGeometry(model),
        BUTTONS.B.shortcut
      )
      if (model.getGeometry().coordinates.length < 3) {
        simplifyButton.html().disabled = true
        straightenButton.html().disabled = true
      }

      const existingFormGroup = element.querySelector('div.form-group.e85');
      if (existingFormGroup) {
        existingFormGroup.replaceWith(panel.html());
      } else {
        element.prepend(panel.html());
      }
    }

    /**
     * Handler for `segments.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {Array} models
     * @return {void}
     */
    onSegments (event, element, models) {
      // Skip for locked roads
      if (models.filter((model) => model.isLockedByHigherRank() || !model.isGeometryEditable()).length > 0) {
        element.querySelector('div.form-group.e85')?.remove()
        return
      }

      let panel = this.helper.createPanel(I18n.t(this.name).title)
      let simplifyButton = panel.addButton(
        'A',
        BUTTONS.A.title,
        BUTTONS.A.description,
        () => this.simplifyStreetGeometry(models),
        BUTTONS.A.shortcut
      )

      // Don't straighten multiple components
      let straightenButton = panel.addButton(
        'B',
        BUTTONS.B.title,
        BUTTONS.B.description,
        () => this.straightenStreetGeometry(models),
        BUTTONS.B.shortcut
      )

      let modelWithComponents = models.filter(model => model.getGeometry().coordinates.length > 2)

      if (modelWithComponents.length === 0) {
        simplifyButton.html().disabled = true
      }

      if (W.selectionManager.getSegmentSelection().multipleConnectedComponents) {
        straightenButton.html().disabled = true
      }

      if (!W.selectionManager.getSegmentSelection().multipleConnectedComponents
        && models.length === 2) {
        panel.addDiv('align-by-angle')

        for (let key of ['C','D','E','F']) {
          let angle = this.settings.get('buttons', key)
          panel.addButton(
            key,
            `∡${angle}°`,
            `∡${angle}°`,
            () => this.alignStreetGeometry(models[0], models[1], angle),
            ''
          )
        }
      }

      const existingFormGroup = element.querySelector('div.form-group.e85');
      if (existingFormGroup) {
        existingFormGroup.replaceWith(panel.html());
      } else {
        element.prepend(panel.html());
      }
    }

    /**
     * Remove geometry nodes on the target segment
     * @param {Object} model
     * @return {void}
     */
    simplifySegmentGeometry (model) {
      if (model.getGeometry().coordinates.length < 3) {
        return
      }

      this.group('simplify segment geometry')
      this.log('check geometry of the segment with ID ' + model.getID())
      let nodes = []

      // calculate angles for every inside point
      for (let i = 0; i < model.getGeometry().coordinates.length - 2; i++) {
        let nodeStart = model.getGeometry().coordinates[i],
          nodeCenter = model.getGeometry().coordinates[i + 1],
          nodeEnd = model.getGeometry().coordinates[i + 2]

        nodes[i] = {
          angle: Math.round(this.findAngle(nodeStart, nodeCenter, nodeEnd)),
          start: Math.round(this.findLength(nodeStart, nodeCenter)),
          end: Math.round(this.findLength(nodeCenter, nodeEnd)),
        }
        this.log('point ' + (i+1) + ' : ' + nodes[i].angle + '°, ' + nodes[i].start + 'm, ' + nodes[i].end + 'm')
      }

      let removeNodes = []

      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]

        // mark to remove a node with a short START segment
        if (node.start < this.settings.get('simplify', 'short')) {
          this.log('found too short segment: ' + node.start + 'm')
          removeNodes.push(i+1)
          continue // skip the next rule
        }
        // mark to remove a node with a short END segment and big ANGLE
        if (node.angle >= this.settings.get('simplify', 'angle')
          && node.end < this.settings.get('simplify', 'short')) {
          this.log('found too short fragment: ' + node.end + 'm')
          removeNodes.push(i+1)
          i++ // skip next node
          continue // skip the next rule
        }
        // mark to remove a node with a big angle and short segments
        if (node.angle >= this.settings.get('simplify', 'angle')
          && node.start + node.end < this.settings.get('simplify', 'twoShort')) {
          this.log(
            'found point with short fragment: ' + node.start + ' + ' + node.end + ' = ' +
            (node.start + node.end) + 'm and angle equal to ' + node.angle + '°'
          )
          removeNodes.push(i+1)
          // continue // skip next rule
        }
      }

      // remove nodes from geometry
      if (removeNodes.length) {
        let newGeometry = { ... model.getGeometry() }
        let coordinates = []
        for (let i = 0; i < newGeometry.coordinates.length; i++) {
          if (removeNodes.indexOf(i) === -1) {
            coordinates.push(newGeometry.coordinates[i])
          }
        }
        newGeometry.coordinates = coordinates
        W.model.actionManager.add(new WazeActionUpdateSegmentGeometry(model, model.getGeometry(), newGeometry))
      }
      this.groupEnd()
    }

    /**
     * Calculates the angle (in radians) between two vectors pointing outward from one center
     *
     * @param {Object} start first point
     * @param {Object} center second point
     * @param {Object} end third point
     */
    findAngle (start, center, end) {
      let b = Math.pow(center[0] - start[0], 2) + Math.pow(center[1] - start[1], 2),
        a = Math.pow(center[0] - end[0], 2) + Math.pow(center[1] - end[1], 2),
        c = Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
      return Math.acos((a + b - c) / Math.sqrt(4 * a * b)) * (180 / Math.PI)
    }

    /**
     * Get the length of the line by point coordinates
     * @param {Array<number,number>} start point
     * @param {Array<number,number>} end point
     * @return {Number} length in meters
     */
    findLength (start, end) {
      return distance(start[0], start[1], end[0], end[1])
    }

    /**
     * Remove geometry nodes on the target segments
     * @param {Array} models
     * @return {void}
     */
    simplifyStreetGeometry (models) {
      this.group('simplify street geometry')
      for (let i = 0; i < models.length; i++) {
        this.simplifySegmentGeometry(models[i])
      }
      this.groupEnd()
    }

    /**
     * Aligns the segments into a straight line by moving the intermediate
     * nodes to the intersection points of the perpendiculars with
     * the calculated line passing through the start and end nodes of the selection.
     *
     * A, B, and C are the parameters of the calculated line equation:
     *   Ax + By + C = 0
     *
     * @param {Array} models
     * @return {void}
     */
    straightenStreetGeometry (models) {
      this.group('straighten street geometry')
      this.log('calculating the formula for the straight line')

      let segmentSelection = W.selectionManager.getSegmentSelection()

      if (segmentSelection.multipleConnectedComponents) {
        this.log('don\'t try to straighten multiple segments without connection')
      }

      let
        allNodeIds = [], // all nodes for selected segments
        dupNodeIds = [], // only nodes inside connections
        virtualNodes = [] // virtual nodes of segments

      models.forEach(segment => {
        this.log('straighten segment #' + segment.getID())

        // simplify segment to straight
        this.straightenSegmentGeometry(segment)

        // collect the nodes
        allNodeIds.push(segment.getFromNode().getID())
        allNodeIds.push(segment.getToNode().getID())
        virtualNodes = virtualNodes.concat(segment.getVirtualNodes())
      })

      if (virtualNodes.length ) {
        this.log('⚠️ virtual nodes are present, please disconnect all trails and rails from the segments and try again')

        // doesn't work, but why? what is wrong with this code?
        // virtualNodes.forEach(node => {
        //   let element = document.getElementById(node.getOLGeometry.id)
        //   element.setAttribute("fill","#dd7700")
        //
        //   element.addEventListener("click", () => {
        //     element.setAttribute("fill","#00ece3")
        //   });
        // })

        return
      }

      allNodeIds.forEach((nodeId, idx) => {
        if (allNodeIds.indexOf(nodeId, idx + 1) > -1) {
          if (!dupNodeIds.includes(nodeId))
            dupNodeIds.push(nodeId);
        }
      });

      let distinctNodeIds = [...new Set(allNodeIds)];
      let endPointNodeIds = distinctNodeIds.filter((nodeId) => !dupNodeIds.includes(nodeId));
      let endPointNodes = W.model.nodes.getByIds(endPointNodeIds),
        endPointNode1Geo = endPointNodes[0].getGeometry().coordinates,
        endPointNode2Geo = endPointNodes[1].getGeometry().coordinates

      const a = endPointNode2Geo[1] - endPointNode1Geo[1],
        b = endPointNode1Geo[0] - endPointNode2Geo[0],
        c = endPointNode2Geo[0] * endPointNode1Geo[1] - endPointNode1Geo[0] * endPointNode2Geo[1];

      dupNodeIds.forEach((nodeId) => {
        const node = W.model.nodes.getObjectById(nodeId),
          nodeCoordinates = node.getGeometry().coordinates;
        const d = nodeCoordinates[1] * a - nodeCoordinates[0] * b,
          newCoordinates = getIntersectCoordinates(a, b, c, d);

        this.log('move node #' + nodeId + ' to [' + newCoordinates[0] + ';' + newCoordinates[1] + ']')
        this.moveNode(node, newCoordinates)
      });

      // I don't understand why doesn't it work, in the WME all looks good, but it fails when try to save changes
      // virtualNodes.forEach((node) => {
      //   const nodeCoordinates = node.getGeometry().coordinates;
      //   const d = nodeCoordinates[1] * a - nodeCoordinates[0] * b,
      //     newCoordinates = getIntersectCoordinates(a, b, c, d);
      //
      //   this.log('move node #' + node.getID() + ' to [' + newCoordinates[0] + ';' + newCoordinates[1] + ']')
      //   this.moveNode(node, newCoordinates)
      // });

      this.groupEnd()
    }


    /**
     * Align two segments by angle
     * This method moves the node to new point
     *
     * @param {Object} segment1
     * @param {Object} segment2
     * @param {Number} angle
     * @return {void}
     */
    alignStreetGeometry (segment1, segment2, angle = 90) {
      this.log('align street geometry ∡' + angle + '°')

      if (segment1.getType() !== 'segment'
        || segment2.getType() !== 'segment') {
        this.log('only segments must be selected')
        return
      }

      /**
       * Extract coordinates from components
       * @param {Object} segment
       * @param {'first'|'second'|'last-but-one'|'last'} position
       * @return {*[]}
       */
      function getCoordinatesFromComponent(segment, position) {
        let pos = 0
        switch (position) {
          case 'first':
            pos = 0
            break
          case 'second':
            pos = 1
            break
          case 'last-but-one':
            pos = segment.getOLGeometry().components.length - 2
            break
          case 'last':
            pos = segment.getOLGeometry().components.length - 1
            break
        }
        return [
          segment.getOLGeometry().components[pos].x,
          segment.getOLGeometry().components[pos].y,
        ]
      }

      let A, B, C, commonNode

      if (segment1.getToNode().getID() === segment2.getFromNode().getID()) {
        // A → B → C
        commonNode = segment1.getToNode()
        A = getCoordinatesFromComponent(segment1, 'last-but-one')
        B = getCoordinatesFromComponent(segment1, 'last')
        C = getCoordinatesFromComponent(segment2, 'second')
      } else if (segment1.getFromNode().getID() === segment2.getFromNode().getID()) {
        // B ← A → C
        commonNode = segment1.getFromNode()
        A = getCoordinatesFromComponent(segment1, 'second')
        B = getCoordinatesFromComponent(segment1, 'first')
        C = getCoordinatesFromComponent(segment2, 'second')
      } else if (segment1.getToNode().getID() === segment2.getToNode().getID()) {
        // A → B ← C
        commonNode = segment1.getToNode()
        A = getCoordinatesFromComponent(segment1, 'last-but-one')
        B = getCoordinatesFromComponent(segment1, 'last')
        C = getCoordinatesFromComponent(segment2, 'last-but-one')
      } else if (segment1.getFromNode().getID() === segment2.getToNode().getID()) {
        // B ← A ← C
        commonNode = segment1.getFromNode()
        A = getCoordinatesFromComponent(segment1, 'second')
        B = getCoordinatesFromComponent(segment1, 'first')
        C = getCoordinatesFromComponent(segment2, 'last-but-one')
      }

      if (!commonNode) {
        this.log('segments does not have common node')
        return
      }

      this.log('common node coords [' + B[0] + ';' + B[1] + ']')

      // Coordinates of points A, B and C
      // First selected segment uses it as line for calculation
      let intersection = findIntersectionWithAngle(A, B, C, angle)

      // Uses OpenLayers with convertation, because
      intersection = W.userscripts.toGeoJSONGeometry(new OpenLayers.Geometry.Point( ...intersection ))

      this.log('point of the intersection is [' + intersection[0] + ', ' + intersection[1] +']')

      this.moveNode(commonNode, intersection.coordinates)
    }

    /**
     * Straighten up segment, remove all geometry nodes except first and last
     * @param {Object} segment
     */
    straightenSegmentGeometry (segment) {
      this.group('straighten segment geometry')
      if (segment.getGeometry().coordinates.length > 2) {
        let multiAction = new WazeActionMultiAction()
        let newGeometry = structuredClone(segment.attributes.geoJSONGeometry)
        // just left the first and last elements
        newGeometry.coordinates.splice(1, newGeometry.coordinates.length - 2)
        // W.model.actionManager.add(new WazeActionUpdateSegmentGeometry(segment, segment.getGeometry(), newGeometry))
        let updateSegmentGeometry = new WazeActionUpdateSegmentGeometry(segment, segment.attributes.geoJSONGeometry, newGeometry)
        updateSegmentGeometry.generateDescription();
        multiAction.doSubAction(W.model, updateSegmentGeometry);
        W.model.actionManager.add(multiAction);
      }
    }

    /**
     * Move node to new position
     * @param {Object} node target
     * @param {Array<2>} coords of the new position, array of the wo elements
     */
    moveNode (node, coords) {
      let nodeGeometry = node.getGeometry()
      nodeGeometry.coordinates = coords

      let connectedSegObjs = {}
      let emptyObj = {}

      node.getSegmentIds().forEach((id) => {
        connectedSegObjs[id] = { ...W.model.segments.getObjectById(id).getGeometry() }
      })

      W.model.actionManager.add(
        new WazeActionMoveNode(
          node,
          node.getGeometry(),
          nodeGeometry,
          connectedSegObjs,
          emptyObj
        )
      )
    }
  }

  /**
   * @param {Array<number,number>} A point of line
   * @param {Array<number,number>} B point of line
   * @param {Array<number,number>} C point
   * @return {(number|*)[]}
   */
  function findIntersection(A, B, C) {
    // Функция для вычисления углового коэффициента прямой
    function slope(point1, point2) {
      return (point2[1] - point1[1]) / (point2[0] - point1[0]);
    }

    // Функция для вычисления c (точка пересечения с осью Y) для уравнения прямой
    function intercept(point, slope) {
      return point[1] - slope * point[0];
    }

    // Вычисляем угловой коэффициент для прямой AB
    let mAB = slope(A, B);
    // Вычисляем c для прямой AB
    let cAB = intercept(A, mAB);

    // Для перпендикуляра угловой коэффициент будет обратным и противоположным
    let mPerpendicular = -1 / mAB;
    // Вычисляем c для перпендикулярной прямой, проходящей через C
    let cPerpendicular = intercept(C, mPerpendicular);

    // Находим точку пересечения прямых
    let x = (cPerpendicular - cAB) / (mAB - mPerpendicular);
    let y = mAB * x + cAB;

    return [x, y];
  }

  /**
   * Finds the intersection of a line (passing through A and B) and a second line
   * that passes through point C and intersects the first line at a given angle.
   *
   * Note: For any angle, there are two possible intersection points. This function
   * calculates one of them.
   *
   * @param {Array<number,number>} A A point on the primary line.
   * @param {Array<number,number>} B A second point on the primary line.
   * @param {Array<number,number>} C The point through which the second line passes.
   * @param {number} angleDegrees The desired angle between the two lines in degrees.
   * @returns {(Array<number,number>|null)} The coordinates of the intersection point, or null if the lines are parallel.
   */
  function findIntersectionWithAngle(A, B, C, angleDegrees) {
    const [Ax, Ay] = A;
    const [Bx, By] = B;
    const [Cx, Cy] = C;

    // Convert the desired angle from degrees to radians for trigonometric functions
    const angleRadians = angleDegrees * (Math.PI / 180);

    // If the angle is 0 or 180, the lines are parallel. No unique intersection unless C is on line AB.
    // We check for floating point inaccuracies by seeing if sin(angle) is very close to 0.
    if (Math.abs(Math.sin(angleRadians)) < 1e-9) {
      console.error("Angle is 0 or 180 degrees; lines are parallel. No unique intersection.");
      return null;
    }

    let m1; // Slope of line AB
    let c1; // Y-intercept of line AB

    // --- Handle Vertical Line Case for AB ---
    if (Math.abs(Ax - Bx) < 1e-9) {
      m1 = Infinity;
      c1 = Infinity; // No y-intercept
    } else {
      m1 = (By - Ay) / (Bx - Ax);
      c1 = Ay - m1 * Ax;
    }

    // Calculate the slope of the second line (m2) using the tangent formula
    const tanAngle = Math.tan(angleRadians);
    let m2;

    if (m1 === Infinity) {
      // If line AB is vertical, its angle is 90 degrees. The new line's slope is tan(90 ± angle).
      // tan(90 - angle) = cot(angle) = 1 / tan(angle)
      m2 = 1 / tanAngle;
    } else {
      // Using the formula: m2 = (m1 - tan(angle)) / (1 + m1 * tan(angle))
      // This corresponds to one of the two possible lines.
      // The other uses + in the numerator and - in the denominator.
      const denominator = 1 + m1 * tanAngle;
      if (Math.abs(denominator) < 1e-9) {
        // This occurs when 1 + m1*tan(angle) = 0 => m1 = -1/tan(angle), i.e., the lines are perpendicular
        // The slope m2 would be infinite (a vertical line).
        m2 = Infinity;
      } else {
        m2 = (m1 - tanAngle) / denominator;
      }
    }

    // Now we have the slope m2 of the line passing through C.
    const c2 = Cy - m2 * Cx;

    // --- Find the final intersection point ---
    let x, y;

    // Check for near-parallel lines which can cause massive floating point errors
    if (Math.abs(m1 - m2) < 1e-9) {
      console.error("Lines are parallel, no unique intersection.");
      return null;
    }

    if (m1 === Infinity) { // Line AB is vertical
      x = Ax;
      y = m2 * x + c2;
    } else if (m2 === Infinity) { // The new line is vertical
      x = Cx;
      y = m1 * x + c1;
    } else { // General case
      x = (c2 - c1) / (m1 - m2);
      y = m1 * x + c1;
    }

    return [x, y];
  }

  /**
   * Find intersection point
   * @param {Number} A
   * @param {Number} B
   * @param {Number} C
   * @param {Number} D
   * @return {Number[]}
   */
  function getIntersectCoordinates (A, B, C, D) {
    //  http://rsdn.ru/forum/alg/2589531.hot
    let r = [2]
    r[1] = -1.0 * (C * B - A * D) / (A * A + B * B)
    r[0] = (-r[1] * (B + A) - C + D) / (A - B)

    return r
  }

  /**
   * Detect the direction
   * @param {Number} A
   * @param {Number} B
   * @return {Number}
   */
  function getDeltaDirect (A, B) {
    if (A < B) {
      return 1.0
    } else if (A > B) {
      return -1.0
    }

    return 0.0
  }

  /**
   * Calculate the approximate distance between two coordinates (lat/lon)
   *
   * © Chris Veness, MIT-licensed,
   * http://www.movable-type.co.uk/scripts/latlong.html#equirectangular
   *
   * @param {number} λ1 first point latitude
   * @param {number} φ1 first point longitude
   * @param {number} λ2 second point latitude
   * @param {number} φ2 second point longitude
   */
  function distance (λ1, φ1, λ2, φ2) {
    let R = 6371000;
    let Δλ = (λ2 - λ1) * Math.PI / 180;
    φ1 = φ1 * Math.PI / 180;
    φ2 = φ2 * Math.PI / 180;
    let x = Δλ * Math.cos((φ1+φ2)/2);
    let y = (φ2-φ1);
    let d = Math.sqrt(x*x + y*y);
    return R * d;
  };

  $(document).on('bootstrap.wme', () => {

    WazeActionAddNode = require('Waze/Action/AddNode')
    WazeActionMoveNode = require('Waze/Action/MoveNode')
    WazeActionMultiAction = require('Waze/Action/MultiAction');
    WazeActionUpdateSegmentGeometry = require('Waze/Action/UpdateSegmentGeometry')

    let Instance = new E85(NAME, SETTINGS)
    Instance.init(BUTTONS)

    // setup name for a shortcut section
    WMEUIShortcut.setGroupTitle(NAME, I18n.t(NAME).title)
  })
})()
