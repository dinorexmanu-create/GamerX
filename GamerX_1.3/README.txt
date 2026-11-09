GAMERX 1.3 — TRE GIOCHI

Contenuti:
- Mario Adventure 2.1
- Nation Builder 2.1
- Marion Troller 2.3

ISTRUZIONI GITHUB PAGES
Il file index.html deve comparire nella PRIMA PAGINA del repository GamerX, allo stesso livello delle cartelle assets e games. NON caricare lo ZIP direttamente e NON inserire tutti i file sotto una cartella GamerX_1.3 o GamerX_Hosting.

1. Estrai lo ZIP sul computer.
2. Apri la cartella GamerX_1.3.
3. Nel repository GitHub clicca Add file > Upload files (dalla pagina principale del repository).
4. Trascina il contenuto della cartella GamerX_1.3 nell'area di caricamento. Mantieni la struttura delle cartelle. Conferma con Commit changes.
5. Verifica che index.html sia visibile nella radice e che games/marion-troller/index.html esista.
6. In Settings > Pages imposta Deploy from a branch, main, /(root).
7. Apri https://dinorexmanu-create.github.io/GamerX/ dopo che la pubblicazione e' terminata.

Se hai gia' pubblicato la versione 1.2, puoi caricare SOLO:
- assets/js/catalog.js
- assets/img/marion-troller.svg
- games/marion-troller/index.html
Ciascun file deve finire nel percorso corretto. Sostituisci catalog.js esistente.

Nota: Marion Troller carica la libreria multiplayer MQTT da un CDN esterno, quindi le sue funzionalita' multiplayer richiedono accesso alla rete.
