(function () {
  'use strict';
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var games = Array.isArray(window.GAMERX_GAMES) ? window.GAMERX_GAMES : [];
  var game = games.find(function (item) { return item.id === id; });
  var title = document.getElementById('playTitle');
  var description = document.getElementById('playDescription');
  var iframe = document.getElementById('gameIframe');
  var frame = document.getElementById('playerFrame');
  var reload = document.getElementById('reloadGame');
  var fullscreen = document.getElementById('fullScreen');
  if (!game) {
    title.textContent = 'Gioco non trovato'; description.textContent = 'Questo gioco non è ancora presente nella libreria.';
    frame.replaceChildren(); frame.appendChild(document.createTextNode('Torna alla libreria e scegli un gioco disponibile.'));
    reload.disabled = true; fullscreen.disabled = true; document.title = 'Gioco non trovato — GamerX'; return;
  }
  title.textContent = game.title; description.textContent = game.description || 'Buon divertimento!';
  document.title = game.title + ' — GamerX'; iframe.title = game.title;
  // Accetta solo file interni al sito; impedisce URL esterni o javascript:.
  if (!/^games\/[a-z0-9_\/-]+\.html$/i.test(game.url) || game.url.indexOf('..') !== -1) {
    title.textContent = 'Percorso gioco non valido'; reload.disabled = true; fullscreen.disabled = true; return;
  }
  iframe.src = game.url;
  document.getElementById('openDirect').href = game.url;
  reload.addEventListener('click', function () { iframe.src = game.url; });
  fullscreen.addEventListener('click', function () { if (document.fullscreenElement) { document.exitFullscreen(); } else if (frame.requestFullscreen) { frame.requestFullscreen(); } });
}());
