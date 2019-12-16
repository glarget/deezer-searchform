Bonjour, voici quelques précisions concernant mes travaux

### `Mon approche`

J'ai voulu créer un projet assez structuré et d'exploiter au maximum la notion de class components et dump components qui affichent des props.

Dans l'ensemble, le projet est complexe et mon temps a été limité dû au temps que me prend mon travail actuel.
En ce sens, j'ai tenté de répondre au mieux à vos demandes sans pour autant être satistait de tout. Tout n'a pas été fait et je m'en excuse d'avance.

Les data sont centralisés dans un store pour n'avoir qu'une seule source de vérité.

Il y a un state global mais parfois des states propres aux sous composants

En terme UI, l'utilisation ds `css modules system` a été privilégié, couplés à `sass``
J'ai fait en sorte de centraliser au maximum les variables.scss

En terme de composants, j'ai opté pour un dossier par composant, avec joint dans la mesure du possible un fichier de test du type index.spec.js

### `Utilisation de redux et react-redux`

Pour un projet comme un moteur de recherche, j'ai estimé nécessaire d'avoir un store afin de centraliser un state global. J'ai donc utilisé redux

En ce qui concerne react-redux, l'idée est de pouvoir connecter dans un futur proche d'autres composants au store via un Provider et c'est pour cela que j'ai choisi d'opter pour react-redux.

Dans l'absolu, il est possible de n'utiliser que redux et de passer des props de parents à enfants mais je n'ai pas voulu faire cela

### `Les packages utilisés`

- Pour le projet en lui-même : `create-react-app`
- Pour les tests : `jest / enzyme et react-testing-library`
- Pour le sélecteur de tri: `react-select`
- Pour l'exploitation du scss : `node-sass`
- Pour le fetch d'api : `axios`
- Pour la partie asynchrone : `utilisation du middleware redux-thunk`
- Pour affichage du loader au moment du fetching: `react-loader-spinner`
- Pour corriger le problème de CORS: `http-proxy-middleware`

### `Les travaux`

[x] Affichage des résultats par colonnes

J'ai juste utilisé du display flex. J'aurais pu utiliser les data-grids avec `@supports()` mais j'ai voulu faire simple

[x] Permettre le redimensionnement des colonnes

J'ai fait en sorte qu'il y ait 4 colonnes et qu'en mobile, cela s'affiche à peu près correctement.
Cela est loin d'être parfait mais je pense que vous avez grossomodo l'essentiel

[ ] (pas fait) Pas de pagination mais un "infinite scroll" (affichage des résultats paquet par paquet déclenché quand l'utilisateur arrive en bas de page)

`Désolé je n'ai pas eu le temps de faire cette partie. La raison est que je n'ai pas eu beaucoup de temps et que je ne souhaite pas ralentir vos process`

Ce que j'aurais fait, c'est utiliser par exemple `React.lazy`

[x] Possibilité de classement des résultats au clic sur l'entête des colonnes

J'ai ajouté un picto pour filter par id et rank au clic dessus.

[x] Une fonctionnalité permettant le filtrage en temps réel des résultats

J'ai utilisé react-select pour cela. Un filtre par album est possible en temps réel. Il met à jour le state des chansons en obtenant state.album
Le design scss n'est pas parfait dû j'en suis conscient. Veuillez m'en excuser

### [x] `Le temps d'execution`

J'ai utilisé react `throttle-debounce` pour cela. A chaque onChange de l'input, un throttle est déclenché d'une valeur de 300ms

### [] (testé mais pas totalement) `Compatibilité navigateur`

Faute de temps, je suis parti à l'essentiel, travailler sur webkit et gecko. En ce qui concerne IE9, je n'ai pas pu tester. La raison est que je n'ai pas eu le temps.

L'idée est là d'utiliser `@supports()`et d'éviter au maximum les hacks css. La création d'une feuille de style IE est assez old school et je ne pense pas que cela soit encore une pratique très répandue.
Sinon, j'aurais utilisé les display inline-block classique ou même les flottants

### [x] (testés mais pas totalement) `L’ajout de test unitaires est un plus`

J'ai écrit les tests pour le composant principal comme App.js et aussi les sous composants. Tout n'est pas fait et j'en suis désolé. Cela prends un peu de temps et je n'ai pas eu assez le timing pour tout finaliser.

Certaines parties comme App.js utilise Jest/Enzyme et d'autres dans les sous composants utilisent react-testing-library.

J'ai souhaité utilisé les deux pour montrer ma volonté de progresser et d'exploiter cette nouvelle librarie qui est `react-testing-library`
