(function () {
  'use strict';
  var games = Array.isArray(window.GAMERX_GAMES) ? window.GAMERX_GAMES.filter(function (g) { return g && typeof g.id === 'string' && typeof g.title === 'string' && typeof g.url === 'string'; }) : [];
  var search = document.getElementById('searchGames');
  var filterHost = document.getElementById('categoryFilters');
  var grid = document.getElementById('gameGrid');
  var count = document.getElementById('filteredCount');
  var empty = document.getElementById('emptyState');
  var selectedCategory = 'Tutti';
  document.getElementById('gameCount').textContent = games.length;
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  var categories = ['Tutti'];
  games.forEach(function (game) { var c = game.category || 'Altro'; if (categories.indexOf(c) < 0) categories.push(c); });
  categories.forEach(function (category) {
    var button = document.createElement('button');
    button.type = 'button'; button.className = 'filter-btn' + (category === selectedCategory ? ' selected' : ''); button.textContent = category;
    button.setAttribute('aria-pressed', String(category === selectedCategory));
    button.addEventListener('click', function () { selectedCategory = category; renderFilters(); render(); });
    filterHost.appendChild(button);
  });
  function renderFilters() { Array.prototype.forEach.call(filterHost.children, function (el) { var yes = el.textContent === selectedCategory; el.classList.toggle('selected', yes); el.setAttribute('aria-pressed', String(yes)); }); }
  function text(tag, cls, value) { var node = document.createElement(tag); if (cls) node.className = cls; node.textContent = value; return node; }
  function render() {
    var term = search.value.trim().toLocaleLowerCase('it');
    var results = games.filter(function (g) { return (selectedCategory === 'Tutti' || (g.category || 'Altro') === selectedCategory) && (!term || [g.title, g.description || '', g.category || ''].join(' ').toLocaleLowerCase('it').indexOf(term) !== -1); });
    grid.replaceChildren();
    results.forEach(function (game) {
      var card = document.createElement('article'); card.className = 'game-card';
      var href = 'play.html?id=' + encodeURIComponent(game.id);
      var link = document.createElement('a'); link.href = href; link.className = 'card-cover'; link.setAttribute('aria-label', 'Gioca a ' + game.title);
      if (game.cover) { var img = document.createElement('img'); img.src = game.cover; img.alt = 'Copertina di ' + game.title; img.loading = 'lazy'; img.onerror = function () { img.style.display = 'none'; }; link.appendChild(img); }
      if (game.badge) link.appendChild(text('span', 'game-badge', game.badge));
      var overlay = text('span', 'cover-play', '▶'); overlay.setAttribute('aria-hidden', 'true'); link.appendChild(overlay);
      card.appendChild(link);
      var body = document.createElement('div'); body.className = 'game-card-body';
      body.appendChild(text('span', 'game-category', game.category || 'Altro'));
      var title = document.createElement('h3'); var titleLink = document.createElement('a'); titleLink.href = href; titleLink.textContent = game.title; title.appendChild(titleLink); body.appendChild(title);
      body.appendChild(text('p', 'game-desc', game.description || 'Gioca ora su GamerX.'));
      var foot = document.createElement('div'); foot.className = 'game-card-foot'; foot.appendChild(text('span', 'browser-label', '◈ Browser Game'));
      var play = document.createElement('a'); play.href = href; play.className = 'play-link'; play.textContent = 'Gioca →'; foot.appendChild(play); body.appendChild(foot); card.appendChild(body); grid.appendChild(card);
    });
    count.textContent = results.length;
    empty.hidden = results.length !== 0;
  }
  search.addEventListener('input', render);
  document.getElementById('resetFilters').addEventListener('click', function () { selectedCategory = 'Tutti'; search.value = ''; renderFilters(); render(); search.focus(); });
  render();
}());
