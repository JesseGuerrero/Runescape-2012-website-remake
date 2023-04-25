'use strict';

export var TitleLabel = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div');
        container.id = 'titleLabel';
        container.innerHTML = "Darkan Map";

        L.DomEvent.disableClickPropagation(container);
        return container;
    }
});
