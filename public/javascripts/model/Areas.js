'use strict';

import {Area} from './Area.js';
import {Position} from './Position.js';

export class Areas {

    constructor(map) {
        this.map = map;
        this.featureGroup = new L.FeatureGroup();
        this.areas = [];
        this.rectangles = [];
    }

    add(area) {
        this.areas.push(area);
        var rectangle = area.toLeaflet(this.map);
        area.rect = rectangle;
        this.rectangles.push(rectangle);
        this.featureGroup.addLayer(rectangle);
    }

    remove(area) {
        let removed = this.areas.splice(this.areas.indexOf(area), 1);
        this.rectangles.splice(this.rectangles.indexOf(removed[0].rect), 1);
        this.featureGroup.removeLayer(removed[0].rect);
    }

    removeLast() {
        if (this.areas.length > 0) {
            this.areas.pop();
            this.featureGroup.removeLayer(this.rectangles.pop());
        }
    }

    removeAll() {
        while (this.areas.length > 0) {
            this.areas.pop();
            this.featureGroup.removeLayer(this.rectangles.pop());
        }
    }
}