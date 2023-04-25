'use strict';

import Players from "../model/Players.js";
import {Position} from "../model/Position.js";

export var PlayerControl = L.Control.extend({
  options: {
    position: 'topleft'
  },

  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control noselect');
    container.style.background = 'none';
    container.style.width = '100px';
    container.style.height = 'auto';

    var labelsButton = L.DomUtil.create('a', 'leaflet-bar leaflet-control leaflet-control-custom', container);
    labelsButton.id = 'toggle-map-players';
    labelsButton.innerHTML = 'Toggle Players';

    L.DomEvent.on(labelsButton, 'click', this._togglePlayers, this);

    this._enabled = true;
    this._markers = {};

    var self = this;
    L.DomEvent.disableClickPropagation(container);
    return container;
  },

  _togglePlayers: function() {
    if (this._enabled) {
      this._map.getPane("map-players").style.display = "none";
      this._enabled = false;
    } else {
      this._map.getPane("map-players").style.display = "";
      this._enabled = true;
    }
  }
});
