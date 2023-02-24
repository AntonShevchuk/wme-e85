// ==UserScript==
// @name         WME E85 Simplify Street Geometry
// @name:uk      WME 🇺🇦 E85 Simplify Street Geometry
// @version      0.1.6
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
// @require      https://greasyfork.org/scripts/389765-common-utils/code/CommonUtils.js?version=1090053
// @require      https://greasyfork.org/scripts/450160-wme-bootstrap/code/WME-Bootstrap.js?version=1153357
// @require      https://greasyfork.org/scripts/452563-wme/code/WME.js?version=1101598
// @require      https://greasyfork.org/scripts/450221-wme-base/code/WME-Base.js?version=1137043
// @require      https://greasyfork.org/scripts/450320-wme-ui/code/WME-UI.js?version=1137289
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
        C: '∡90°',
      },
      settings: {
        title: 'Settings',
        description: 'Settings for simplifying segments',
        simplifyShort: 'Remove a fragment shorter than',
        simplifyAngle: 'If the angle is bigger than',
        simplifyTwoShort: 'and fragments shorter than',
      },
    },
    'uk': {
      title: 'Геометрія вулиць',
      description: 'Спрощуйте та вирівнюйте вулиці',
      buttons: {
        A: 'Спростити',
        B: 'Вирівняти',
        C: '∡90°',
      },
      settings: {
        title: 'Налаштування',
        description: 'Для спрощення сегментів будуть враховані наступні параметри',
        simplifyShort: 'Видаляти фрагменти менші ніж',
        simplifyAngle: 'Або якщо кут більше ніж',
        simplifyTwoShort: 'та фрагменти меньші ніж',
      },
    },
    'ru': {
      title: 'Геометрия улиц',
      description: 'Упрощайте и выравнивайте геометрию улиц',
      buttons: {
        A: 'Упростить',
        B: 'Выровнять',
        C: '∡90°',
      },
      settings: {
        title: 'Настройки',
        description: 'Параметры для упрощения геометрии сегмента',
        simplifyShort: 'Если фрагмент короче, чем',
        simplifyAngle: 'Или угол больше чем',
        simplifyTwoShort: 'и фрагменты меньше, чем',
      },
    }
  }

  const STYLE =
    'button.e85.e85-A { background-color: #0f9; margin-right: 2px }' +
    'button.e85.e85-B { background-color: #09f; color: #fff }' +
    'button.e85.e85-C { background-color: #f99; margin-left: 2px }' +
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
    C: {
      title: I18n.t(NAME).buttons.C,
      description: I18n.t(NAME).buttons.C,
      shortcut: '',
    },
  }

  // Default settings
  const SETTINGS = {
    simplifyShort: 5,
    simplifyAngle: 176,
    simplifyTwoShort: 50,
  }

  let WazeActionUpdateSegmentGeometry
  let WazeActionMoveNode
  let WazeActionAddNode

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
          'icon': 'route'
        }
      )

      // Setup options for script
      let fieldset = this.helper.createFieldset(I18n.t(NAME).settings.title)
      fieldset.addText('description', I18n.t(NAME).settings.description)
      let settings = this.settings.get()
      for (let item in settings) {
        if (settings.hasOwnProperty(item)) {
          fieldset.addNumber(
            'settings-' + item,
            I18n.t(NAME).settings[item],
            event => this.settings.set([item], event.target.value),
            this.settings.get(item),
            (item === 'simplifyAngle') ? 150 : 0,
            (item === 'simplifyAngle') ? 180 : 200,
            1
          )
        }
      }
      this.tab.addElement(fieldset)
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
      if (model.isLockedByHigherRank()) {
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
      if (model.geometry.components.length < 3) {
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
      if (models.filter((model) => model.isLockedByHigherRank()).length > 0) {
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

      panel.addButton(
        'B',
        BUTTONS.B.title,
        BUTTONS.B.description,
        () => this.straightenStreetGeometry(models),
        BUTTONS.B.shortcut
      )

      let modelWithComponents = models.filter(model => model.geometry.components.length > 2)

      if (modelWithComponents.length === 0) {
        simplifyButton.html().disabled = true
      }
      if (models.length === 2) {
        panel.addButton(
          'C',
          BUTTONS.C.title,
          BUTTONS.C.description,
          () => this.orthogonalizeStreetGeometry(models[0], models[1]),
          BUTTONS.C.shortcut
        )
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
      if (model.geometry.components.length < 3) {
        return
      }

      this.group('simplify segment geometry')
      this.log('check geometry of the segment with ID ' + model.getID())
      let nodes = []

      // calculate angles for every inside point
      for (let i = 0; i < model.geometry.components.length - 2; i++) {
        let nodeStart = model.geometry.components[i],
          nodeCenter = model.geometry.components[i + 1],
          nodeEnd = model.geometry.components[i + 2]

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

        // mark to remove a node with short START segment
        if (node.start < this.settings.get('simplifyShort')) {
          this.log('found too short segment: ' + node.start + 'm')
          removeNodes.push(i+1)
          continue // skip next rule
        }
        // mark to remove a node with short END segment and big ANGLE
        if (node.angle >= this.settings.get('simplifyAngle')
          && node.end < this.settings.get('simplifyShort')) {
          this.log('found too short fragment: ' + node.end + 'm')
          removeNodes.push(i+1)
          i++ // skip next node
          continue // skip next rule
        }
        // mark to remove a node with big angle and short segments
        if (node.angle >= this.settings.get('simplifyAngle')
          && node.start + node.end < this.settings.get('simplifyTwoShort')) {
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
        let newGeometry = model.geometry.clone()
        let components = []
        for (let i = 0; i < newGeometry.components.length; i++) {
          if (removeNodes.indexOf(i) === -1) {
            components.push(newGeometry.components[i])
          }
        }
        newGeometry.components = components
        W.model.actionManager.add(new WazeActionUpdateSegmentGeometry(model, model.geometry, newGeometry))
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
      let b = Math.pow(center.x - start.x, 2) + Math.pow(center.y - start.y, 2),
        a = Math.pow(center.x - end.x, 2) + Math.pow(center.y - end.y, 2),
        c = Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      return Math.acos((a + b - c) / Math.sqrt(4 * a * b)) * (180 / Math.PI)
    }

    /**
     * Get the length of the line by point coordinates
     * @param {Object} start
     * @param {Object} end
     * @return {Number} length in meters
     */
    findLength (start, end) {
      let line = new OpenLayers.Geometry.LineString([start, end])
      return line.getGeodesicLength('EPSG:900913')
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
     * Выравнивает сегменты в прямую линию, перемещая промежуточные узлы
     * в точки пересечения перпендикуляров к вычисленной прямой, проходящей через
     * начальный и конечный узлы выделения
     * A,B,C - параметры вычисленной прямой уравнения Аx + By + C = 0
     *
     * @param {Array} models
     * @return {void}
     */
    straightenStreetGeometry (models) {
      this.group('straighten street geometry')
      this.log('calculating the formula for the straight line')

      let T1, T2,
        t,
        A = 0.0,
        B = 0.0,
        C = 0.0

      for (let i = 0; i < models.length; i++) {
        let segment = models[i]

        let geometry = segment.geometry

        if (geometry.components.length < 2) {
          continue
        }

        // определяем формулу наклонной прямой
        let A1 = geometry.components[0].clone(),
          A2 = geometry.components[geometry.components.length - 1].clone()

        let dX = getDeltaDirect(A1.x, A2.x)
        let dY = getDeltaDirect(A1.y, A2.y)

        // looks very strange
        let tX = i > 0 ? getDeltaDirect(T1.x, T2.x) : 0
        let tY = i > 0 ? getDeltaDirect(T1.y, T2.y) : 0

        this.log('vector of the line - tX=' + tX + ', tY=' + tY)
        this.log('segment #' + (i + 1) + ' (' + A1.x + '; ' + A1.y + ') - (' + A2.x + '; ' + A2.y + '), dX=' + dX + ', dY=' + dY)

        if (dX < 0) {
          t = A1.x
          A1.x = A2.x
          A2.x = t

          t = A1.y
          A1.y = A2.y
          A2.y = t

          dX = getDeltaDirect(A1.x, A2.x)
          dY = getDeltaDirect(A1.y, A2.y)

          this.log('rotate segment #' + (i + 1) + ' (' + A1.x + '; ' + A1.y + ') - (' + A2.x + '; ' + A2.y + '), dX=' + dX + ', dY=' + dY)
        }

        // looks very strange
        if (i === 0) {
          T1 = A1.clone()
          T2 = A2.clone()
        } else {
          if (A1.x < T1.x) {
            T1.x = A1.x
            T1.y = A1.y
          }

          if (A2.x > T2.x) {
            T2.x = A2.x
            T2.y = A2.y
          }

          this.log('calculated straight line (' + T1.x + '; ' + T1.y + ') - (' + T2.x + '; ' + T2.y + ')')
        }
      }

      A = T2.y - T1.y
      B = T1.x - T2.x
      C = T2.x * T1.y - T1.x * T2.y

      this.log('line coords: (' + T1.x + ';' + T1.y + ') - (' + T2.x + ';' + T2.y + ')')
      this.log('line formula: ' + A + 'x + ' + B + 'y + ' + C)

      for (let i = 0; i < models.length; i++) {
        let segment = models[i]

        this.group('straighten segment #' + i)

        // упрощаем сегмент, если нужно
        this.straightenSegmentGeometry(segment)

        // работа с узлом
        let node = W.model.nodes.getObjectById(segment.attributes.fromNodeID)
        let D = node.attributes.geometry.y * A - node.attributes.geometry.x * B
        let r1 = getIntersectCoordinates(A, B, C, D)
        this.log('move node A')
        this.moveNode(node, r1)

        let node2 = W.model.nodes.getObjectById(segment.attributes.toNodeID)
        let D2 = node2.attributes.geometry.y * A - node2.attributes.geometry.x * B
        let r2 = getIntersectCoordinates(A, B, C, D2)
        this.log('move node B')
        this.moveNode(node2, r2)

        this.log('segment #' + (i + 1) + ' (' + r1[0] + ';' + r1[1] + ') - (' + r2[0] + ';' + r2[1] + ')')
        this.groupEnd()
      }
    }

    /**
     * Orthogonalize two segments
     * This method move the node to new point
     *
     * @param {Object} segment1
     * @param {Object} segment2
     * @return {void}
     */
    orthogonalizeStreetGeometry (segment1, segment2) {
      this.log('orthogonalize street geometry')

      if (segment1.type !== 'segment' || segment2.type !== 'segment') {
        this.log('only segments must be selected')
        return
      }

      let seg1Attrs = segment1.attributes,
        seg2Attrs = segment2.attributes
      let commonNodeID

      // find ID of the common node
      let node = {}
      if (seg1Attrs.fromNodeID === seg2Attrs.fromNodeID) commonNodeID = seg1Attrs.fromNodeID
      else if (seg1Attrs.fromNodeID === seg2Attrs.toNodeID) commonNodeID = seg1Attrs.fromNodeID
      else if (seg1Attrs.toNodeID === seg2Attrs.fromNodeID) commonNodeID = seg1Attrs.toNodeID
      else if (seg1Attrs.toNodeID === seg2Attrs.toNodeID) commonNodeID = seg1Attrs.toNodeID

      if (!commonNodeID) {
        this.log('segments does not have common node')
        return
      }

      this.log('common node ID: ' + commonNodeID)
      node = W.model.nodes.getObjectById(commonNodeID)

      // ID другого узла второго сегмента. От него будем строить перпендикуляр
      let otherNodeID = commonNodeID === seg2Attrs.fromNodeID ? seg2Attrs.toNodeID : seg2Attrs.fromNodeID
      let otherNode = W.model.nodes.getObjectById(otherNodeID)

      // упростим оба сегмента
      // TODO: подумать, можно ли использовать координаты промежуточных узлов и не упрощать сегменты
      this.straightenSegmentGeometry(segment1)
      this.straightenSegmentGeometry(segment2)

      // вычислим новое положение общего узла
      // координаты концов первого сегмента
      let x1 = segment1.getFromNode().attributes.geometry.x,
        y1 = segment1.getFromNode().attributes.geometry.y,
        x2 = segment1.getToNode().attributes.geometry.x,
        y2 = segment1.getToNode().attributes.geometry.y

      // коэффициенты в формуле прямой, проходящей через концы первого сегмента
      let A = y1 - y2,
        B = x2 - x1,
        C = x1 * y2 - x2 * y1,
        // что такое D ???
        D = otherNode.attributes.geometry.y * A - otherNode.attributes.geometry.x * B

      // move node and its segments to calculated position
      this.moveNode(node, getIntersectCoordinates(A, B, C, D))
    }

    /**
     * Straighten up segment, remove all geometry nodes except first and last
     * @param {Object} segment
     */
    straightenSegmentGeometry (segment) {
      if (segment.geometry.components.length > 2) {
        let newGeometry = segment.geometry.clone()
        newGeometry.components.splice(1, newGeometry.components.length - 2)
        W.model.actionManager.add(new WazeActionUpdateSegmentGeometry(segment, segment.geometry, newGeometry))
      }
    }

    /**
     * Move node to new position
     * @param {Object} node target
     * @param {Array<2>} coords of the new position, array of the wo elements
     */
    moveNode (node, coords) {
      let nodeGeo = node.geometry.clone()
      nodeGeo.x = coords[0]
      nodeGeo.y = coords[1]
      nodeGeo.calculateBounds()

      let connectedSegObjs = {}
      let emptyObj = {}
      for (let j = 0; j < node.attributes.segIDs.length; j++) {
        let segId = node.attributes.segIDs[j]
        connectedSegObjs[segId] = W.model.segments.getObjectById(segId).geometry.clone()
      }
      W.model.actionManager.add(new WazeActionMoveNode(node, node.geometry, nodeGeo, connectedSegObjs, emptyObj))
    }
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
   * Detect direction
   * @param {Number} A
   * @param {Number} B
   * @return {Number}
   */
  function getDeltaDirect (A, B) {
    let d = 0.0

    if (A < B) {
      d = 1.0
    } else if (A > B) {
      d = -1.0
    }

    return d
  }

  $(document).on('bootstrap.wme', () => {

    WazeActionUpdateSegmentGeometry = require('Waze/Action/UpdateSegmentGeometry')
    WazeActionMoveNode = require('Waze/Action/MoveNode')
    WazeActionAddNode = require('Waze/Action/AddNode')

    let Instance = new E85(NAME, SETTINGS)
    Instance.init(BUTTONS)

    // setup name for shortcut section
    WMEUIShortcut.setGroupTitle(NAME, I18n.t(NAME).title)
  })
})()
