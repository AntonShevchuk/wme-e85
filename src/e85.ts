import { NAME } from './name'

const PREVIEW_LAYER = 'E85: Preview'

const PREVIEW_STYLE = {
  styleContext: {},
  styleRules: [
    {
      predicate: (properties: any) => properties.styleName === 'preview-border',
      style: {
        stroke: true,
        strokeColor: '#ffffff',
        strokeLinecap: 'round',
        strokeOpacity: 0.8,
        strokeWidth: 8,
      },
    },
    {
      predicate: (properties: any) => properties.styleName === 'preview',
      style: {
        stroke: true,
        strokeColor: '#ff2424',
        strokeDashstyle: 'dash',
        strokeLinecap: 'round',
        strokeOpacity: 0.8,
        strokeWidth: 4,
      },
    },
  ],
}

export class E85 extends WMEBase {
  buttons: any

  constructor (name, settings, buttons) {
    super(name, settings)

    this.buttons = buttons

    this.initTab()
    this.initPreviewLayer()
    this.initShortcuts()
  }

  /**
   * Initial UI elements
   */
  initTab () {
    let tab = this.helper.createTab(
      WMEUI.t(NAME).title,
      {
        sidebar: this.wmeSDK.Sidebar,
        image: GM_info.script.icon
      }
    )

    // Setup options for the script
    let fieldset = this.helper.createFieldset(WMEUI.t(NAME).settings.simplify.title)
    fieldset.addText('description', WMEUI.t(NAME).settings.simplify.description)

    let simplify = this.settings.get('simplify')
    for (let item in simplify) {
      if (simplify.hasOwnProperty(item)) {
        fieldset.addNumber(
          'settings-simplify-' + item,
          WMEUI.t(NAME).settings.simplify[item],
          event => this.settings.set('simplify', item, Number(event.target.value)),
          this.settings.get('simplify', item),
          (item === 'angle') ? 150 : 0,
          (item === 'angle') ? 180 : 200,
          1
        )
      }
    }

    tab.addElement(fieldset)

    // Setup options for the script
    let fieldsetButtons = this.helper.createFieldset(WMEUI.t(NAME).settings.buttons.title)
    fieldsetButtons.addText('description', WMEUI.t(NAME).settings.buttons.description)

    let settingsButtons = this.settings.get('buttons')
    for (let item in settingsButtons) {
      if (settingsButtons.hasOwnProperty(item)) {
        fieldsetButtons.addNumber(
          'settings-buttons-' + item,
          WMEUI.t(NAME).settings.buttons[item],
          event => this.settings.set('buttons', item, Number(event.target.value)),
          this.settings.get('buttons', item),
          0,
          180,
          5
        )
      }
    }

    tab.addElement(fieldsetButtons)

    // Micro doglegs settings
    let fieldsetDoglegs = this.helper.createFieldset(WMEUI.t(NAME).settings.microDoglegs.title)
    fieldsetDoglegs.addText('description', WMEUI.t(NAME).settings.microDoglegs.description)

    fieldsetDoglegs.addCheckbox(
      'settings-microdoglegs-enabled',
      WMEUI.t(NAME).settings.microDoglegs.enabled,
      event => this.settings.set('microDoglegs', 'enabled', event.target.checked),
      this.settings.get('microDoglegs', 'enabled')
    )

    fieldsetDoglegs.addNumber(
      'settings-microdoglegs-maxdistance',
      WMEUI.t(NAME).settings.microDoglegs.maxDistance,
      event => this.settings.set('microDoglegs', 'maxDistance', Number(event.target.value)),
      this.settings.get('microDoglegs', 'maxDistance'),
      1, 20, 1
    )

    fieldsetDoglegs.addNumber(
      'settings-microdoglegs-mindistance',
      WMEUI.t(NAME).settings.microDoglegs.minDistance,
      event => this.settings.set('microDoglegs', 'minDistance', Number(event.target.value)),
      this.settings.get('microDoglegs', 'minDistance'),
      0, 20, 1
    )

    tab.addElement(fieldsetDoglegs)

    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )

    tab.addText('blue', 'made in')
    tab.addText('yellow', 'Ukraine')

    // Inject custom HTML to container in the WME interface
    tab.inject()
  }

  /**
   * Initial shortcuts
   */
  initShortcuts () {
    this.createShortcut('simplify', WMEUI.t(NAME).description, 'A+E', () => this.simplifySelected())
    this.createShortcut('all', WMEUI.t(NAME).description + ' [*]', 'A+Y', () => this.simplifyAll())
  }

  /**
   * Handler for `segment.wme` event
   */
  onSegment (event, element, model) {
    // Skip for blocked roads
    if (
      this.canEditSegment(model)
    ) {
      // Panel can be already exists
      let panel = this.helper.createPanel(WMEUI.t(NAME).title)

      let simplifyButton = panel.addButton(
        'A',
        this.buttons.A.title,
        this.buttons.A.description,
        () => this.simplifySegmentGeometry(model),
      )

      let straightenButton = panel.addButton(
        'B',
        this.buttons.B.title,
        this.buttons.B.description,
        () => this.straightenSegmentGeometry(model),
      )

      if (this.settings.get('microDoglegs', 'enabled')) {
        let doglegButton = panel.addButton(
          'M',
          this.buttons.M.title,
          this.buttons.M.description,
          () => this.removeMicroDoglegs(model),
        )
        if (model.geometry.coordinates.length < 3) {
          (doglegButton.html() as HTMLButtonElement).disabled = true
        }
      }

      if (model.geometry.coordinates.length < 3) {
        (simplifyButton.html() as HTMLButtonElement).disabled = true;
        (straightenButton.html() as HTMLButtonElement).disabled = true
      }

      const existingFormGroup = element.querySelector('div.wme-ui-panel.e85');
      if (existingFormGroup) {
        existingFormGroup.replaceWith(panel.html());
      } else {
        element.prepend(panel.html());
      }
    } else {
      // Remove the panel
      element.querySelector('div.wme-ui-panel.e85')?.remove()
    }
  }

  /**
   * Handler for `segments.wme` event
   */
  onSegments (event, element, models) {
    // Skip for locked roads
    if (models.filter((model) =>
        this.canEditSegment(model)
      ).length === 0
    ) {
      element.querySelector('div.wme-ui-panel.e85')?.remove()
      return
    }

    let panel = this.helper.createPanel(WMEUI.t(NAME).title)
    let simplifyButton = panel.addButton(
      'A',
      this.buttons.A.title,
      this.buttons.A.description,
      () => this.simplifyStreetGeometry(models)
    )

    // Don't straighten multiple components
    let straightenButton = panel.addButton(
      'B',
      this.buttons.B.title,
      this.buttons.B.description,
      () => this.straightenStreetGeometry(models)
    )

    if (this.settings.get('microDoglegs', 'enabled')) {
      panel.addButton(
        'M',
        this.buttons.M.title,
        this.buttons.M.description,
        () => this.removeMicroDoglegsMultiple(models)
      )
    }

    let modelWithComponents = models.filter(model => model.geometry.coordinates.length > 2)
    if (modelWithComponents.length === 0) {
      (simplifyButton.html() as HTMLButtonElement).disabled = true
    }

    if (models.length === 2) {
      let first = models[0]
      let second = models[1]

      // check connections of the first segment
      // trying to find the second one
      let connections = []
      connections = connections.concat(this.wmeSDK.DataModel.Segments.getConnectedSegments({ segmentId: first.id }))
      connections = connections.concat(this.wmeSDK.DataModel.Segments.getConnectedSegments({ segmentId: first.id, reverseDirection: true }))
      connections = connections.map(segment => segment.id)

      if (connections.indexOf(second.id) !== -1) {
        panel.addDiv('align-by-angle')

        let settingsButtons = this.settings.get('buttons')
        for (let key in settingsButtons) {
          if (settingsButtons.hasOwnProperty(key)) {
            let angle = Number(settingsButtons[key])
            if (angle === 0) continue
            let btn = panel.addButton(
              key,
              `\u2221${angle}\u00B0`,
              `\u2221${angle}\u00B0`,
              () => this.alignStreetGeometry(first, second, angle),
            )
            let el = btn.html()
            el.addEventListener('mouseenter', () => this.showPreview(first, second, angle))
            el.addEventListener('mouseleave', () => this.clearPreview())
          }
        }
      }
    }

    const existingFormGroup = element.querySelector('div.wme-ui-panel.e85');
    if (existingFormGroup) {
      existingFormGroup.replaceWith(panel.html());
    } else {
      element.prepend(panel.html());
    }
  }

  /**
   * Remove geometry nodes on the target segment
   */
  simplifySegmentGeometry (model) {
    this.log('check geometry of the segment with ID ' + model.id)

    if (model.geometry.coordinates.length < 3) {
      this.log('geometry is simple, skipped')
      return
    }

    this.group('simplify segment geometry')
    let nodes = []

    // calculate angles for every inside point
    for (let i = 0; i < model.geometry.coordinates.length - 2; i++) {
      let nodeStart = model.geometry.coordinates[i],
        nodeCenter = model.geometry.coordinates[i + 1],
        nodeEnd = model.geometry.coordinates[i + 2]

      nodes[i] = {
        angle: Math.round(GeoUtils.findAngle(nodeStart, nodeCenter, nodeEnd)),
        start: Math.round(GeoUtils.getDistance(nodeStart, nodeCenter)),
        end: Math.round(GeoUtils.getDistance(nodeCenter, nodeEnd)),
      }
      this.log('point ' + (i+1) + ' : ' + nodes[i].angle + '\u00B0, ' + nodes[i].start + 'm, ' + nodes[i].end + 'm')
    }

    let removeNodes = []

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i]

      // mark to remove a node with a short START segment
      if (node.start < this.settings.get('simplify', 'short')) {
        this.log('found too short segment: ' + node.start + 'm; point: ' + (i + 1))
        removeNodes.push(i+1)
        continue // skip the next rule
      }
      // mark to remove a node with a short END segment and big ANGLE
      if (node.angle >= this.settings.get('simplify', 'angle')
        && node.end < this.settings.get('simplify', 'short')) {
        this.log('found too short fragment: ' + node.end + 'm; point: ' + (i + 1))
        removeNodes.push(i+1)
        i++ // skip next node
        continue // skip the next rule
      }
      // mark to remove a node with a big angle and short segments
      if (node.angle >= this.settings.get('simplify', 'angle')
        && node.start + node.end < this.settings.get('simplify', 'twoShort')) {
        this.log(
          'found point with short fragment: ' + node.start + ' + ' + node.end + ' = ' +
          (node.start + node.end) + 'm and angle equal to ' + node.angle + '\u00B0'
        )
        removeNodes.push(i+1)
      }
    }


    // remove nodes from geometry
    if (removeNodes.length) {
      this.log('points to remove: ' + removeNodes.join(', '))
      let geometry = structuredClone(model.geometry)
      geometry.coordinates = []
      // insert coordinates if it shouldn't delete
      for (let i = 0; i < model.geometry.coordinates.length; i++) {
        if (removeNodes.indexOf(i) === -1) {
          this.log(
            'Add point ' + (i + 1) + ' : '
            + model.geometry.coordinates[i][0] + ','
            + model.geometry.coordinates[i][1]
          )
          geometry.coordinates.push(model.geometry.coordinates[i])
        }
      }

      this.wmeSDK.DataModel.Segments.updateSegment({
        segmentId: model.id, geometry
      })
    } else {
      this.log('modification is not needed')
    }
    this.groupEnd()
  }

  /**
   * Remove geometry nodes on all segments on the screen
   */
  simplifyAll () {
    this.group('simplify on screen segments')

    let segments = this.getAllSegments()

    segments = segments.filter((model) =>
      this.canEditSegment(model)
    )

    this.simplifyStreetGeometry(
      segments
    )
    this.groupEnd()
  }

  /**
   * Remove geometry nodes on the selected segments
   */
  simplifySelected () {
    this.group('simplify selected segments')
    this.simplifyStreetGeometry(
      this.getSelectedSegments()
    )
    this.groupEnd()
  }

  /**
   * Remove geometry nodes on the target segments
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
   */
  straightenStreetGeometry (models) {
    this.group('straighten street geometry')

    function getIntersectCoordinates (A, B, C, D) {
      let r = []
      r[1] = -1.0 * (C * B - A * D) / (A * A + B * B)
      r[0] = (-r[1] * (B + A) - C + D) / (A - B)
      return r
    }

    this.log('calculating the formula for the straight line')

    let
      allNodeIds = [],
      dupNodeIds = [],
      virtualNodes = []

    models.forEach(segment => {
      this.log('straighten segment #' + segment.id)

      allNodeIds.push(segment.fromNodeId)
      allNodeIds.push(segment.toNodeId)

      let nodes = this.wmeSDK.DataModel.Segments.getVirtualNodes( {segmentId: segment.id} )

      if (nodes.length === 0) {
        this.straightenSegmentGeometry(segment)
      } else {
        virtualNodes = virtualNodes.concat(nodes)
      }
    })

    if (virtualNodes.length ) {
      this.log('\u26A0\uFE0F virtual nodes are present, please disconnect all trails and rails from the segments and try again')
      this.groupEnd()
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
    let endPointNodes = endPointNodeIds.map(id => this.wmeSDK.DataModel.Nodes.getById( {nodeId: id} )),
      endPointNode1Geo = endPointNodes[0].geometry.coordinates,
      endPointNode2Geo = endPointNodes[1].geometry.coordinates

    const a = endPointNode2Geo[1] - endPointNode1Geo[1],
      b = endPointNode1Geo[0] - endPointNode2Geo[0],
      c = endPointNode2Geo[0] * endPointNode1Geo[1] - endPointNode1Geo[0] * endPointNode2Geo[1];

    dupNodeIds.forEach((nodeId) => {
      const node = this.wmeSDK.DataModel.Nodes.getById( {nodeId: nodeId} )
      const nodeCoordinates = node.geometry.coordinates
      const d = nodeCoordinates[1] * a - nodeCoordinates[0] * b
      const newCoordinates = getIntersectCoordinates(a, b, c, d);
      const newGeometry = node.geometry
      newGeometry.coordinates = newCoordinates

      this.log('move node #' + nodeId + ' to [' + newCoordinates[0] + ';' + newCoordinates[1] + ']')

      this.wmeSDK.DataModel.Nodes.moveNode({
        id: nodeId,
        geometry: newGeometry
      })
    });

    this.groupEnd()
  }


  /**
   * Initialize the preview layer for angle alignment
   */
  initPreviewLayer () {
    this.wmeSDK.Map.addLayer({
      layerName: PREVIEW_LAYER,
      styleRules: PREVIEW_STYLE.styleRules,
      styleContext: PREVIEW_STYLE.styleContext,
      zIndex: 1800,
    })
    this.wmeSDK.Map.setLayerVisibility({ layerName: PREVIEW_LAYER, visibility: true })
  }

  /**
   * Compute the new intersection point for angle alignment (without applying)
   */
  computeAlignment (first, second, angle): number[] | null {
    let A, B, C

    if (first.toNodeId === second.fromNodeId) {
      A = this.getCoord(first, 'next-to-last')
      B = this.getCoord(first, 'last')
      C = this.getCoord(second, 'second')
    } else if (first.fromNodeId === second.fromNodeId) {
      A = this.getCoord(first, 'second')
      B = this.getCoord(first, 'first')
      C = this.getCoord(second, 'second')
    } else if (first.toNodeId === second.toNodeId) {
      A = this.getCoord(first, 'next-to-last')
      B = this.getCoord(first, 'last')
      C = this.getCoord(second, 'next-to-last')
    } else if (first.fromNodeId === second.toNodeId) {
      A = this.getCoord(first, 'second')
      B = this.getCoord(first, 'first')
      C = this.getCoord(second, 'next-to-last')
    } else {
      return null
    }

    if (Number(angle) === 180) {
      let current = GeoUtils.findAngle(A, B, C)
      if (180 === Math.round(current)) return null

      let distAB = GeoUtils.getAngularDistance(A, B)
      let distBC = GeoUtils.getAngularDistance(B, C)
      let distAC = GeoUtils.getAngularDistance(A, C)

      let distance
      if (distAC < distAB && distAC < distBC) {
        distance = distAC / 2
      } else if (distAB < distBC) {
        distance = distAB
      } else {
        distance = distBC
      }

      return GeoUtils.getDestination(A, GeoUtils.getBearing(A, C), distance)
    }

    return GeoUtils.findIntersection(A, B, C, angle)
  }

  /**
   * Get coordinates from a segment at a given position
   */
  getCoord (segment, position: string): number[] {
    let pos = 0
    switch (position) {
      case 'first': pos = 0; break
      case 'second': pos = 1; break
      case 'next-to-last': pos = segment.geometry.coordinates.length - 2; break
      case 'last': pos = segment.geometry.coordinates.length - 1; break
    }
    return [
      segment.geometry.coordinates[pos][0],
      segment.geometry.coordinates[pos][1],
    ]
  }

  /**
   * Build preview geometry for two segments with a new common node position
   */
  showPreview (first, second, angle) {
    this.clearPreview()

    let intersection = this.computeAlignment(first, second, angle)
    if (!intersection) return

    // Build preview lines through the new intersection point
    let firstCoords = structuredClone(first.geometry.coordinates)
    let secondCoords = structuredClone(second.geometry.coordinates)

    // Replace the common node coordinate in cloned geometries
    if (first.toNodeId === second.fromNodeId) {
      firstCoords[firstCoords.length - 1] = intersection
      secondCoords[0] = intersection
    } else if (first.fromNodeId === second.fromNodeId) {
      firstCoords[0] = intersection
      secondCoords[0] = intersection
    } else if (first.toNodeId === second.toNodeId) {
      firstCoords[firstCoords.length - 1] = intersection
      secondCoords[secondCoords.length - 1] = intersection
    } else if (first.fromNodeId === second.toNodeId) {
      firstCoords[0] = intersection
      secondCoords[secondCoords.length - 1] = intersection
    }

    // Border (thicker solid line behind)
    let border1 = turf.lineString(firstCoords, { styleName: 'preview-border' }, { id: 'preview-b1' })
    let border2 = turf.lineString(secondCoords, { styleName: 'preview-border' }, { id: 'preview-b2' })
    // Foreground (dashed line on top)
    let feature1 = turf.lineString(firstCoords, { styleName: 'preview' }, { id: 'preview-1' })
    let feature2 = turf.lineString(secondCoords, { styleName: 'preview' }, { id: 'preview-2' })

    this.wmeSDK.Map.addFeatureToLayer({ layerName: PREVIEW_LAYER, feature: border1 })
    this.wmeSDK.Map.addFeatureToLayer({ layerName: PREVIEW_LAYER, feature: border2 })
    this.wmeSDK.Map.addFeatureToLayer({ layerName: PREVIEW_LAYER, feature: feature1 })
    this.wmeSDK.Map.addFeatureToLayer({ layerName: PREVIEW_LAYER, feature: feature2 })
  }

  /**
   * Remove preview features from the layer
   */
  clearPreview () {
    const ids = ['preview-b1', 'preview-b2', 'preview-1', 'preview-2']
    for (let id of ids) {
      try {
        this.wmeSDK.Map.removeFeatureFromLayer({ layerName: PREVIEW_LAYER, featureId: id })
      } catch (e) {}
    }
  }

  /**
   * Align two segments by angle
   */
  alignStreetGeometry (first, second, angle = 90) {
    this.clearPreview()
    this.log('align street geometry \u2221' + angle + '\u00B0')

    let commonNodeId
    if (first.toNodeId === second.fromNodeId || first.toNodeId === second.toNodeId) {
      commonNodeId = first.toNodeId
    } else if (first.fromNodeId === second.fromNodeId || first.fromNodeId === second.toNodeId) {
      commonNodeId = first.fromNodeId
    }

    if (!commonNodeId) {
      this.log('segments does not have common node')
      return
    }

    let intersection = this.computeAlignment(first, second, angle)
    if (!intersection) {
      this.log('intersection not found')
      return
    }

    let commonNode = this.wmeSDK.DataModel.Nodes.getById({ nodeId: commonNodeId })

    this.log('point of the intersection is [' + intersection[0] + ', ' + intersection[1] + ']')

    commonNode.geometry.coordinates = intersection

    this.wmeSDK.DataModel.Nodes.moveNode({
      id: commonNode.id,
      geometry: commonNode.geometry
    })
  }

  /**
   * Straighten up the segment, remove all geometry nodes except first and last
   */
  straightenSegmentGeometry (segment) {
    this.log('straighten segment geometry')
    if (segment.geometry.coordinates.length > 2) {
      let geometry = structuredClone(segment.geometry)
      geometry.coordinates.splice(
        1, geometry.coordinates.length - 2
      )
      this.wmeSDK.DataModel.Segments.updateSegment({
        segmentId: segment.id,
        geometry: geometry
      })
    }
  }

  /**
   * Remove micro doglegs from multiple segments
   */
  removeMicroDoglegsMultiple (models) {
    this.group('remove micro doglegs on multiple segments')
    let count = 0
    for (let i = 0; i < models.length; i++) {
      count += this.removeMicroDoglegs(models[i], true)
    }
    this.log(`removed micro doglegs from ${count} segments`)
    this.groupEnd()
  }

  /**
   * Remove micro doglegs from a single segment
   */
  removeMicroDoglegs (model, silent = false) {
    if (!silent) this.group('remove micro doglegs')

    let coordinates = model.geometry.coordinates
    if (coordinates.length < 3) {
      if (!silent) {
        this.log('segment has no intermediate geometry nodes, skipped')
        this.groupEnd()
      }
      return 0
    }

    let maxDist = Number(this.settings.get('microDoglegs', 'maxDistance'))
    let minDist = Number(this.settings.get('microDoglegs', 'minDistance'))

    let fromNode = this.wmeSDK.DataModel.Nodes.getById({ nodeId: model.fromNodeId })
    let toNode = this.wmeSDK.DataModel.Nodes.getById({ nodeId: model.toNodeId })

    let removeIndices = []

    // Check first intermediate geometry node (index 1)
    let distFromStart = GeoUtils.getDistance(fromNode.geometry.coordinates, coordinates[1])
    if (!silent) this.log(`first node distance from junction: ${distFromStart.toFixed(2)}m`)
    if (distFromStart <= maxDist && (minDist === 0 || distFromStart >= minDist)) {
      removeIndices.push(1)
    }

    // Check last intermediate geometry node (index length-2)
    let lastIdx = coordinates.length - 2
    if (lastIdx > 1 || (lastIdx === 1 && !removeIndices.includes(1))) {
      let distFromEnd = GeoUtils.getDistance(toNode.geometry.coordinates, coordinates[lastIdx])
      if (!silent) this.log(`last node distance from junction: ${distFromEnd.toFixed(2)}m`)
      if (distFromEnd <= maxDist && (minDist === 0 || distFromEnd >= minDist)) {
        removeIndices.push(lastIdx)
      }
    }

    if (removeIndices.length) {
      let geometry = structuredClone(model.geometry)
      geometry.coordinates = coordinates.filter((_, i) => !removeIndices.includes(i))

      this.wmeSDK.DataModel.Segments.updateSegment({
        segmentId: model.id, geometry
      })
      if (!silent) {
        this.log(`removed ${removeIndices.length} micro dogleg(s)`)
        this.groupEnd()
      }
      return 1
    }

    if (!silent) {
      this.log('no micro doglegs found')
      this.groupEnd()
    }
    return 0
  }
}
