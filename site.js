/* Outils communs : fabrique les cartes à partir des listes de chaque page */
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function estNouveau(d) { var t = Date.parse(d); return !isNaN(t) && (Date.now() - t) < 14 * 864e5; }

function icone(r) {
  return r.icone
    ? '<img class="pix" src="icones/' + esc(r.icone) + '.png" alt="" width="64" height="64">'
    : '<span class="ph" aria-hidden="true">' + esc((r.titre || '?').charAt(0)) + '</span>';
}

function carte(r) {
  var contenu = r.raisons
    ? '<ul>' + r.raisons.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
    : '<p>' + esc(r.description || '') + '</p>';
  return '<a class="bloc carte" href="' + esc(r.lien) + '" target="_blank" rel="noopener">' +
    (estNouveau(r.date) ? '<span class="nouveau">Nouveau!</span>' : '') +
    icone(r) +
    '<div><h3>' + esc(r.titre) + '</h3>' +
    (r.niveaux ? '<p class="niv-txt">' + esc(r.niveaux) + '</p>' : '') +
    contenu + '<span class="ouvrir">Ouvrir (nouvel onglet)</span></div></a>';
}

function remplir(id, liste, messageVide) {
  var el = document.getElementById(id);
  if (!el) return;
  var tries = liste.slice().sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
  el.innerHTML = tries.length ? tries.map(carte).join('') : '<div class="bloc vide">' + esc(messageVide) + '</div>';
}

document.addEventListener('DOMContentLoaded', function () {
  var p = document.getElementById('annee');
  if (p) p.textContent = new Date().getFullYear();
});

/* L'adresse du portail : à changer ici seulement */
var PORTAIL = 'app.html#portail';
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[data-portail]').forEach(function (a) {
    a.href = PORTAIL; a.target = '_blank'; a.rel = 'noopener';
  });
});
