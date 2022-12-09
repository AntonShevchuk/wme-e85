// ==UserScript==
// @name         WME E85 Simplify Street Geometry
// @version      0.0.1
// @description  Simplify Street Geometry, looks like fork
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-template/issues
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://anton.shevchuk.name&size=64
// @grant        none
// @require      https://greasyfork.org/scripts/389765-common-utils/code/CommonUtils.js?version=1090053
// @require      https://greasyfork.org/scripts/450160-wme-bootstrap/code/WME-Bootstrap.js?version=1126584
// @require      https://greasyfork.org/scripts/452563-wme/code/WME.js?version=1101598
// @require      https://greasyfork.org/scripts/450221-wme-base/code/WME-Base.js?version=1101617
// @require      https://greasyfork.org/scripts/450320-wme-ui/code/WME-UI.js?version=1110180
// ==/UserScript==

/* jshint esversion: 8 */

/* global require */
/* global $, jQuery */
/* global W */
/* global I18n */
/* global OpenLayers */
/* global WME, WMEBase */
/* global WMEUI, WMEUIHelper, WMEUIHelperPanel, WMEUIHelperModal, WMEUIHelperTab */
/* global Container, Settings, SimpleCache, Tools  */

(function () {
  'use strict'

  // Script name, uses as unique index
  const NAME = 'E85'

  // Translations
  const TRANSLATION = {
    'en': {
      title: 'Street Geometry',
      buttons: {
        A: 'Simplify',
        B: 'Orthogonal ∡90°',
      },
    },
    'uk': {
      title: 'Геометрія вулиць',
      buttons: {
        A: 'Спростити',
        B: 'Вирівняти під ∡90°',
      },
    },
    'ru': {
      title: 'Геометрия улиц',
      buttons: {
        A: 'Упростить',
        B: 'Выровнять под ∡90°',
      },
    }
  }

  const STYLE =
    ''

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
  const SETTINGS = {}

  class E85 extends WMEBase {
    constructor (name, settings) {
      super(name)
      this.settings = new Settings(name, settings)
    }

    /**
     * Initial UI elements
     * @param {Object} buttons
     */
    init (buttons) {
      /** @type {WMEUIHelper} */
      this.helper = new WMEUIHelper(this.name)
    }

    /**
     * Handler for `segments.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {Array} models
     * @return {void}
     */
    onSegments (event, element, models) {
      this.log('Selected some segments')
      console.log(models, element)

      let panel = this.helper.createPanel(I18n.t(this.name).title)
      panel.addButton(
        'A',
        BUTTONS.A.title,
        BUTTONS.A.description,
        () => this.onButtonA(models),
        BUTTONS.A.shortcut
      )

      if (models.length === 2) {
        panel.addButton(
          'B',
          BUTTONS.B.title,
          BUTTONS.B.description,
          () => this.onButtonB(models),
          BUTTONS.B.shortcut
        )
      }

      element.prepend(panel.html())
    }

    /**
     * @param {Array} models
     * @return {void}
     */
    onButtonA (models) {
      this.log('Button A')
      console.log(models)
    }

    /**
     * @param {Array} models
     * @return {void}
     */
    onButtonB (models) {
      this.log('Button B')
      console.log(models)
    }
  }




  /**
   * Выравнивает сегменты в прямую линию, перемещая промежуточные узлы
   * в точки пересечения перпендикуляров к вычисленной прямой, проходящей через
   * начальный и конечный узлы выделения
   * A,B,C - параметры вычисленной прямой уравнения Аx + By + C = 0
   */
  function DoSimplifyStreetGeometry() {
    console.log('WME-SSG: in DoSimplifyStreetGeometry()');

    if (ssgSelection.length > 0) {
      var T1, T2,
        t,
        A = 0.0,
        B = 0.0,
        C = 0.0,
        D = 0.0;
      var correct = true;

      // определим линию выравнивания
      console.log("WME-SSG: расчёт формулы наклонной прямой...");

      for (var e = 0; e < ssgSelection.length; e++) {
        var segment = ssgSelection[e];

        if (segment.model.type != "segment")
          continue;

        var geometry = segment.model.geometry;

        // определяем формулу наклонной прямой
        if (geometry.components.length > 1) {
          var A1 = geometry.components[0].clone(),
            A2 = geometry.components[geometry.components.length - 1].clone();

          var dX = GetDeltaDirect(A1.x, A2.x);
          var dY = GetDeltaDirect(A1.y, A2.y);

          var tX = e > 0 ? GetDeltaDirect(T1.x, T2.x) : 0;
          var tY = e > 0 ? GetDeltaDirect(T1.y, T2.y) : 0;
          console.log("WME-SSG: расчётный вектор линии - tX=" + tX + ", tY=" + tY);

          console.log("WME-SSG: сегмент #" + (e + 1) + " (" + A1.x + "; " + A1.y + ") - (" + A2.x + "; " + A2.y + "), dX=" + dX + ", dY=" + dY);

          if (dX < 0) {
            t = A1.x;
            A1.x = A2.x;
            A2.x = t;

            t = A1.y;
            A1.y = A2.y;
            A2.y = t;

            dX = GetDeltaDirect(A1.x, A2.x);
            dY = GetDeltaDirect(A1.y, A2.y);
            console.log("WME-SSG: разворачиваем сегмент #" + (e + 1) + " (" + A1.x + "; " + A1.y + ") - (" + A2.x + "; " + A2.y + "), dX=" + dX + ", dY=" + dY);
          }

          if (e === 0) {
            T1 = A1.clone();
            T2 = A2.clone();
          } else {
            if (A1.x < T1.x) {
              T1.x = A1.x;
              T1.y = A1.y;

              /*if ((tY > 0 && A1.y < T1.y) || (tY < 0 && A1.y > T1.y))
                T1.y = A1.y;*/
            }

            if (A2.x > T2.x) {
              T2.x = A2.x;
              T2.y = A2.y;

              /*if ((tY > 0 && A2.y > T2.y) || (tY < 0 && A2.y < T2.y))
                T2.y = A2.y;*/
            }
          }

          console.log("WME-SSG: расчётная прямая по (" + T1.x + "; " + T1.y + ") - (" + T2.x + "; " + T2.y + ")");
        }
      }

      A = T2.y - T1.y;
      B = T1.x - T2.x;
      C = T2.x * T1.y - T1.x * T2.y;

      console.log("WME-SSG: прямая выравнивания рассчитана.");
      console.log("WME-SSG: конечные точки: (" + T1.x + ";" + T1.y + ") - (" + T2.x + ";" + T2.y + ")");
      console.log("WME-SSG: формула прямой: " + A + "x + " + B + "y + " + C);


      // нарисуем контрольную линию
      /*var seg1geo = geometry.clone();
      if (seg1geo.components.length > 2)
        seg1geo.components.splice(1, seg1geo.components.length - 2);
      seg1geo.comments[0].x = T1.x;
      seg1geo.comments[0].y = T1.y;
      seg1geo.comments[1].x = T2.x;
      seg1geo.comments[1].y = T2.y;

      var newseg1 = new W.Feature.Vector.Segment(seg1geo);
      newseg1.attributes.fromNodeID = null;
      newseg1.attributes.toNodeID = null;

      W.model.actionManager.add(new W.Action.AddSegment(newseg1));*/

      console.log("WME-SSG: выравниваем сегменты... "+ ssgSelection.length);

      for (var e2 = 0; e2 < ssgSelection.length; e2++) {
        var segment2 = ssgSelection[e2];
        var model = segment2.model;

        if (model.type != "segment")
          continue;

        // упрощаем сегмент, если нужно
        ssgSimplifySegment( segment2 );

        // работа с узлом
        var node = W.model.nodes.get(model.attributes.fromNodeID);
        var D = node.attributes.geometry.y * A - node.attributes.geometry.x * B;
        var r1 = GetIntersectCoord(A, B, C, D);
        ssgMoveNode(node, r1);

        var node2 = W.model.nodes.get(model.attributes.toNodeID);
        var D2 = node2.attributes.geometry.y * A - node2.attributes.geometry.x * B;
        var r2 = GetIntersectCoord(A, B, C, D2);
        ssgMoveNode(node2, r2);

        console.log("WME-SSG: сегмент #" + (e2 + 1) + " (" + r1[0] + ";" + r1[1] + ") - (" + r2[0] + ";" + r2[1] + ")");
      }
    } // ssgSelection.length > 0
  }


  /**
   * выстраивает два выбранных сегмента перпендикулярно друг другу
   * перемещая их общий узел
   */
  function ssgDoOrtogonalizeStreetGeometry() {
    console.log('WME-SSG: in DoOrtogonalizeStreetGeometry()');

    if (ssgSelection.length != 2) {
      console.log('WME-SSG: only two entities must be selected');
      return;
    }
    var seg1 = ssgSelection[0],
      seg2 = ssgSelection[1],
      seg1Attrs = seg1.model.attributes,
      seg2Attrs = seg2.model.attributes;
    var commonNodeID;

    if (seg1.model.type != 'segment' || seg2.model.type != 'segment') {
      console.log('WME-SSG: only segments must be selected');
      return;
    }

    // ID общего узла
    var node = {};
    if (seg1Attrs.fromNodeID == seg2Attrs.fromNodeID) commonNodeID = seg1Attrs.fromNodeID;
    if (seg1Attrs.fromNodeID == seg2Attrs.toNodeID) commonNodeID = seg1Attrs.fromNodeID;
    if (seg1Attrs.toNodeID == seg2Attrs.fromNodeID) commonNodeID = seg1Attrs.toNodeID;
    if (seg1Attrs.toNodeID == seg2Attrs.toNodeID) commonNodeID = seg1Attrs.toNodeID;
    if (!commonNodeID) {
      console.log('WME-SSG: segments does not have common node.');
      return;
    }
    else {
      console.log('WME-SSG: common node ID: '+ commonNodeID);
      node = W.model.nodes.get(commonNodeID);
    }
    // ID другого узла второго сегмента. От него будем строить перпендикуляр
    var otherNodeID = commonNodeID == seg2Attrs.fromNodeID ? seg2Attrs.toNodeID : seg2Attrs.fromNodeID;
    var otherNode = W.model.nodes.get(otherNodeID);

    // упростим оба сегмента
    // TODO: подумать, можно ли использовать координаты промежуточных узлов и не упрощать сегменты
    ssgSimplifySegment( seg1 );
    ssgSimplifySegment( seg2 );

    // вычислим новое положение общего узла
    // координаты концов первого сегмента
    var x1 = seg1.model.getFromNode().attributes.geometry.x,
      y1 = seg1.model.getFromNode().attributes.geometry.y,
      x2 = seg1.model.getToNode().attributes.geometry.x,
      y2 = seg1.model.getToNode().attributes.geometry.y;

    // коэффициенты в формуле прямой, проходящей через концы первого сегмента
    var A = y1 - y2,
      B = x2 - x1,
      C = x1 * y2 - x2 * y1,
      // что такое D ???
      D = otherNode.attributes.geometry.y * A - otherNode.attributes.geometry.x * B
    ;

    // move node and its segments to calculated position
    ssgMoveNode(node, GetIntersectCoord(A, B, C, D));
  }

  // рассчитаем пересечение перпендикуляра точки с наклонной прямой
  function GetIntersectCoord(A, B, C, D) {
    /*// формулы тут: https://otvet.mail.ru/question/36001356
    var r = [2];
    r[0] = (x1 * y2 * y2 - 2 * x1 * y1 * y2 + x1 * y1 * y1 - x2 * y1 * y2 + x2 * y1 * y1 + x1 * y1 * y2 - x1 * y1 * y1 + 2 * x1 * x2 * x3 + x3 * x2 * x2 + x3 * x1 * x1 + x2 * y2 * y3 - x2 * y1 * y3 - x1 * y2 * y3 + x1 * y1 * y3) / (y2 * y2 - 2 * y1 * y2 + y1 * y1 - 2 * x1 * x2 + x2 * x2 + x1 * x1);
    r[1] = (r[0] - x1) * (y2 - y1) / (x2 - x1) + y1;
    return r;*/

    // второй вариант по-проще: http://rsdn.ru/forum/alg/2589531.hot
    var r = [2];
    r[1] = -1.0 * (C * B - A * D) / (A * A + B * B);
    r[0] = (-r[1] * (B + A) - C + D) / (A - B);

    return r;
  }

  // определим направляющие
  function GetDeltaDirect(A, B) {
    var d = 0.0;

    if (A < B)
      d = 1.0;
    else if (A > B)
      d = -1.0;

    return d;
  }

  /**
   * Выпрямляет сегмент, удаляя все его узлы. Остаются только начальный и конечный узлы.
   * @param segment - сегмент, который необходимо упростить
   */
  function ssgSimplifySegment( segment ) {
    console.log('WME-SSG: in ssgSimplifySegment()');
    if (segment.model.type != "segment")
      return;

    if (segment.geometry.components.length > 2) {
      var newGeometry = segment.geometry.clone();
      newGeometry.components.splice(1, newGeometry.components.length - 2);
      W.model.actionManager.add(new UpdateSegmentGeometry(segment.model, segment.model.geometry, newGeometry));
    }
  }

  /**
   * Перемещает узел
   * @param node - перемещаемый узел
   * @param coord[2] - массив из двух элементов - координаты, в которые перемещается узел
   */
  function ssgMoveNode(node, coords) {
    console.log('WME-SSG: in ssgMoveNode()');
    var nodeGeo = node.geometry.clone();
    nodeGeo.x = coords[0];
    nodeGeo.y = coords[1];
    nodeGeo.calculateBounds();

    var connectedSegObjs = {};
    var emptyObj = {};
    for (var j = 0; j < node.attributes.segIDs.length; j++) {
      var segid = node.attributes.segIDs[j];
      connectedSegObjs[segid] = W.model.segments.get(segid).geometry.clone();
    }
    W.model.actionManager.add(new MoveNode(node, node.geometry, nodeGeo, connectedSegObjs, emptyObj));
  }

  $(document).on('bootstrap.wme', () => {
    let Instance = new E85(NAME, SETTINGS)

    BUTTONS.A.callback = () => Instance.onButtonA()
    BUTTONS.B.callback = () => Instance.onButtonB()

    Instance.init(BUTTONS)

    // rename shortcut section
    WMEUIShortcut.setGroupTitle(NAME, I18n.t(NAME).title)
  })

})()
