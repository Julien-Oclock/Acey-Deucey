
const app = {

  bankroll: 100,

    values : {},
    playerValue : {},
    
    score : [],
    
    cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Valet', 'Dame', 'Roi', 'As'],
    
    replay : document.querySelector("#newRound"),
    
    bank : document.querySelector('#bankroll'),
  
  
    /**
      * Cette fonction a pour but de :
      * verifier l'état de la bankroll
      * cacher la carte du joueurs et de cacher le bouton replay,
      * commence un nouveau tour en tirant 2 nombres aléatoires, 
      * puis met à jour les cartes en conséquence et masque l'élément résultat,
    */
  newRound: () => {

    if (app.bankroll === 0){
      alert( `votre bankroll est vide ! Vous avez perdu !`)
      return
    }


    document.getElementById('resultMessage').classList.add('hidden')

    app.replay.classList.add('hidden');

    document.getElementById('question').className = 'card';

    document.getElementById('potContainer').classList.remove('hidden');
       
    app.values = core.getTwoNumbers(0, 12),
    
    app.updateCard();
    
  },


  // fonction pour afficher les cartes 
  updateCard :() => {

    lowCard = document.querySelector('#card_low');
    highCard = document.querySelector('#card_high');

    lowCard.className = 'card val-' + app.cards[app.values.min];
    highCard.className = 'card val-' + app.cards[app.values.max];
  },


  /**
   * Sera déclenché par la soumission d'un formulaire et obtiendra la valeur de l'input qui a l'id "pot". C'est la mise du joueur
   */
  handleInputSubmit: function (event) {

   

    // Cette fonction sera déclenchée par la soumission d'un formulaire. 
    event.preventDefault();
    // Il va falloir faire une série de vérification sur cette valeur: 
    // - la valeur de la mise doit être un nombre entier
    // - la valeur de la mise doit être nulle ou positive.
    // - la mise ne peut pas être supérieur aux fonds du joueur (qu'on appelle souvent "bankroll") accessible via app.bankroll
    // Si on entre dans un cas d'erreur, affiche une alerte avec un message cohérent.
    // Si tout va bien ( et UNIQUEMENT dans ce cas), il faut lancer la fonction qui termine le round (que tu vas compléter à l'étape 6)

   

    document.getElementById('resultMessage').classList.remove('hidden')
    let inputRangeElement = document.querySelector('#pot').value;
    inputRangeElement = parseFloat(inputRangeElement);

    if (Number.isInteger(inputRangeElement) === true && inputRangeElement > -1 || inputRangeElement < app.bankroll){
      app.endCurrentRound(inputRangeElement);

    } else {
      alert( `votre saisie est incorrecte. votre mise doit être un entier positif`);
    }
  },
  

  /**
   * Termine le round en cours
   */
  endCurrentRound: function (potValue){
    playerCard = document.querySelector('#question');
    playerValue = core.getRandomNumber(0, 12);
    
    playerCard.className = 'card val-' + app.cards[playerValue];
    if (playerValue > app.values.min && playerValue < app.values.max){
      console.log('Vous avez gagné !');
      core.showResults("gagné");
      app.bankroll += potValue;
      app.bank.textContent = app.bankroll;
      
      
      
    } else {
      console.log('vous avez perdu !');
      core.showResults("perdu !");
      app.bankroll -= potValue;
      app.bank.textContent = app.bankroll;

      
    };

    


  },


   /**
   * Initialise l'application
   */
  init: function () {
    // On accroche la fonction "newRound" au bouton "newRound".
    document.getElementById('newRound').addEventListener('click',app.newRound)
    // on vient ajouter un écouteur sur le formulaire  
    const getInput = document.querySelector('#potContainer');
    getInput.addEventListener('submit', app.handleInputSubmit);
    app.newRound(); 
  },

};


// Lorsque la page est totalement chargée, on lance la fonction app.init
document.addEventListener('DOMContentLoaded', app.init);
