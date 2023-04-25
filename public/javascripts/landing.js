$('#features').carousel({
  interval: 6000
});

$.getJSON('https://discordapp.com/api/servers/118102728026095623/embed.json', function(parsed) {
  $('#discord-online').text("Users online: " + parsed.members.length);

  for (var i = 0; i < parsed.channels.length; i++) {
    $('#server-tree').append('<li id="channel-'+parsed.channels[i].id+'" class="discord-channel">' + parsed.channels[i].name + '</li>');
    for (var j = 0; j < parsed.members.length; j++) {
      gameName = '';
      if (parsed.members[j].game)
      gameName = ' - ' + parsed.members[j].game.name;
      if (parsed.members[j].channel_id == parsed.channels[i].id) {
        $('#channel-'+parsed.channels[i].id).append('<ul id="users-'+parsed.channels[i].id+'"></ul>');
        if (parsed.members[j].status != 'online') {
          $('#users-'+parsed.channels[i].id).append('<li class="discord-user"><img src="' + parsed.members[j].avatar_url +
          '" class="discord-avatar"/><div class="discord-user-status discord-idle"></div>' +
          parsed.members[j].username + '<span>' + gameName + '</span></li>');
        } else {
          $('#users-'+parsed.channels[i].id).append('<li class="discord-user"><img src="' + parsed.members[j].avatar_url +
          '" class="discord-avatar"/><div class="discord-user-status discord-online"></div>' +
          parsed.members[j].username + '<span>' + gameName + '</span></li>');
        }
      }
    }
  }
});
