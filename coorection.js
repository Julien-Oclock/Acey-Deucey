
  
var app = {

  bankroll: 100,
  values: {},
  cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Valet', 'Dame', 'Roi', 'As'],
  /**
   * Cette fonction a pour but de commencer un nouveau tour en tirant 2 nombres aléatoires, puis met à jour les cartes en conséquence et masque l'élément résultat
   */
  newRound: function () {
    // On affiche le pot si il est caché
    document.getElementById('potContainer').classList.remove('hidden');
    // Etape 2.1
    // On commence par mettre à jour la propriété values de l'objet app avec un objet qui contient la valeur de la carte la plus basse et celle de la carte la plus haute
    // Pour cela assigne un objet dans app.values avec une propriété min qui a pour valeur 3 et une propriété max qui a pour valeur 5
    app.values = core.getTwoNumbers(0, 12)
    
    // Etape 2.3
    // Pour finir, il faut masquer l'élément résultat, pense à bien le cibler avant de le masquer
    // Pour le masquer, applique lui la classe `hidden` qui est déjà présente dans le css
    const resultElement = document.getElementById('result');
    resultElement.classList.add('hidden');

    // On décale le fonctionnement de mise à jour des cartes dans une fonction ( pour "ranger" le code )
    app.updateCards();
  },

  updateCards: () => {
    // Etape 2.2
    // Puis écris en texte la valeur de la carte dans l'élément HTML qui représente la carte correspondante
    // Pour la carte du milieu, on va écrire "?" dedans (il faut attendre que le joueur mise pour tirer cette carte)
    // Au final tu dois cibler chacun leur tour, les 3 cartes, pour modifier ensuite leur contenu textuel
    const lowCard     = document.getElementById('card_low');
    const highCard    = document.getElementById('card_high');

    lowCard.className = 'card val-' + app.cards[app.values.min];
    highCard.className = 'card val-' + app.cards[app.values.max];
  },
  /**
   * Sera déclenché par la soumission d'un formulaire et obtiendra la valeur de l'input qui a l'id "pot". C'est la mise du joueur
   */
  handleInputSubmit: function (event) {
    // Etape 5.1
    // Cette fonction sera déclenchée par la soumission d'un formulaire. Enfin... quand tu l'auras branchée sur la soumission du formulaire 😈
    // Essaye d'attacher un listener à ton formulaire dans app.init avant de continuer
    // Un simple alert() te permettra de vérifier si ton formulaire est bien branché
    
    // Etape 5.2
    // L'alert s'affiche ? Mais quand tu valides, la page s'actualise ? Commence par prévenir le rechargement de la page (qui est le comportement par défaut de ce genre d'event).
    event.preventDefault();
    // Etape 5.3
    // Ensuite, récupère la valeur de l'input qui porte l'id "pot" ( la mise du joueur ), après l'avoir ciblé. Assure toi de transformer la valeur récuperée en nombre.
    const potInputElement = document.getElementById('pot');
    const potValue = parseInt(potInputElement.value, 10);
    // Etape 5.4 (bonus)
    // Il va falloir faire une série de vérification sur cette valeur: 
    // - la valeur de la mise doit être un nombre entier
    // - la valeur de la mise doit être nulle ou positive.
    // - la mise ne peut pas être supérieur aux fonds du joueur (qu'on appelle souvent "bankroll") accessible via app.bankroll
    // Si on entre dans un cas d'erreur, affiche une alerte avec un message cohérent.
    if (isNaN(potValue)){
      alert("Attention, le pot doit être un nombre entier");
      // On return afin de ne pas executer la suite de la fonction
      return;
    }
    else if(potValue < 0){
      alert("Attention, le pot est positif");
      // On return afin de ne pas executer la suite de la fonction
      return;
    }
    else if (potValue > app.bankroll){
      alert("Attention, la mise ne dois pas dépasser vos fonds");
      // On return afin de ne pas executer la suite de la fonction
      return;
    }

    // Si tout va bien ( et UNIQUEMENT dans ce cas), il faut lancer la fonction qui termine le round (que tu vas compléter à l'étape 6)
    // Pense qu'elle attend en paramètre la valeur de la mise ( que tu viens de récupérer ) il faut donc lui passer un argument ;)
    app.endCurrentRound(potValue);
  },

  /**
   * Termine le round en cours
   */
  endCurrentRound: function (potValue){

    // on cible la carte du milieu
    const middleCardElement = document.getElementById('question');

    // On génère UN SEUL nombre aléatoire ( voir DOC.md)
    const randomCardValue = core.getRandomNumber(0, 12);

    // Puis on change le design de la carte en appliquant la classe ( comme on a fait dans newRound())
    middleCardElement.className = 'card val-' + app.cards[randomCardValue];


    // On compare les cartes
    // Si la 3ème carte est supérieure à la carte basse ET inférieure à la carte haute, le joueur gagne.
    if (randomCardValue > app.values.min && randomCardValue < app.values.max){
      core.showResults(`C'est gagné`);
      app.bankroll += potValue;
      
    } // Sinon il perd la partie
    else {
      core.showResults(`C'est perdu`);
      app.bankroll -= potValue;
    }

    // Dans tout les cas on met à jour la valeur du bankroll dans le DOM
    document.getElementById('bankroll').textContent = app.bankroll;
  },


   /**
   * Initialise l'application
   */
  init: function () {
    // On accroche la fonction "newRound" au bouton "newRound".
    document.getElementById('newRound').addEventListener('click', app.newRound);
    document.getElementById('potContainer').addEventListener('submit', app.handleInputSubmit);

    // Enfin, on lance le premier round !
    app.newRound();

    // Envie de faire le bonus ? :D Entraine toi  ! Va voir ici --> https://3dtransforms.desandro.com/card-flip
  },

};


// Lorsque la page est totalement chargée, on lance la fonction app.init
document.addEventListener('DOMContentLoaded', app.init);
