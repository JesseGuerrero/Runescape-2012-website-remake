'use strict';

import {Position} from '../model/Position.js';
import {Area} from '../model/Area.js';
import {Areas} from '../model/Areas.js';

export var ChunkSelectControl = L.Control.extend({    
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        this._chunks = new Map();
        this._areas = new Areas(this._map);
 
        this._editing = false;

        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control noselect');
        container.style.background = 'none';
        container.style.width = '70px';
        container.style.height = 'auto';

        // Settings control
        this._createControl('<i class="fa fa-cog"></i>', container, function(e) {
            if ($("#settings-panel").is(":visible")) {
                $("#settings-panel").hide("slide", {direction: "right"}, 300);
            } else {
                this._toggleEditing();
                $("#settings-panel").css('display', 'flex').hide();
                $("#settings-panel").show("slide", {direction: "right"}, 300);
            }
        });

        L.DomEvent.disableClickPropagation(container);

        L.DomEvent.on(this._map, 'click', this._addPosition, this);

        L.DomEvent.on(this._map, 'mousemove', this._drawMouseArea, this);

        return container;
    },
    
    _createControl: function(html, container, onClick) {
        var control = L.DomUtil.create('a', 'leaflet-bar leaflet-control leaflet-control-custom', container);
        control.innerHTML = html;
        L.DomEvent.on(control, 'click', onClick, this);
    },

    _addPosition: function(e) {
        if (!this._editing) {
            return;
        }

        var position = Position.fromLatLng(this._map, e.latlng, this._map.plane);
        for (let plane = 0;plane < 4;plane++) {
            let chunkId = ((position.x >> 3) << 11) | (position.y >> 3) | plane << 22;

            let xStart = position.x >> 3 << 3;
            let yStart = position.y >> 3 << 3;

            if (this._chunks.has(chunkId)) {
                let area = this._chunks.get(chunkId);
                this._chunks.delete(chunkId);
                this._areas.remove(area);
            } else {
                let area = new Area(new Position(xStart, yStart), new Position(xStart+7, yStart+7));
                this._areas.add(area);
                this._chunks.set(chunkId, area);
            }
        }
        let array = '[\r\n';
        Array.from(this._chunks.keys()).forEach(i => array += (i+',\r\n'));
        array += ']';
        console.log(array);
    },

    _drawMouseArea: function(e) {
        if (!this._editing) {
            return;
        }

        var position = Position.fromLatLng(this._map, e.latlng, this._map.plane);
        let xStart = position.x >> 3 << 3;
        let yStart = position.y >> 3 << 3;

        if (this._drawnMouseArea !== undefined) { 
            this._map.removeLayer(this._drawnMouseArea);
        }

        this._drawnMouseArea = new Area(new Position(xStart, yStart), new Position(xStart+7, yStart+7)).toLeaflet(this._map);
        this._drawnMouseArea.addTo(this._map, true);
    },

    _toggleEditing: function() {
        $("a.leaflet-control-custom.active").removeClass("active");
        this._editing = !this._editing;
        if (this._editing) {
            this._map.addLayer(this._areas.featureGroup);
        } else {
            this._map.removeLayer(this._areas.featureGroup);
        }
    },
});