'use strict';

import { Position } from './Position.js';

class Players {

  constructor() {
    this.players = [];
  }

  getPlayers(callback) {
    $.ajax({
      url: "/api/world/players",
      dataType: "json",
      context: this,
      success: function(data) {
        this.players = [];
        for (var p in data) {
          this.players.push({
            "name": data[p].name,
            "position": new Position(data[p].coords.x, data[p].coords.y, 0)
          });
        }

        callback(this.players);
      }
    });
  }
}

export default (new Players);
