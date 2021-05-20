/** 
* Code Fourni 
* Passe ton chemin si tu ne veux pas t'embrouiller petit padawan !
**/
/**
 * @typedef {Object} MinMaxObj
 * @property {number} min - Min number
 * @property {number} max - Max Number
 */

/**
 * @namespace core
 */
const core = {

    /**
     * Génère un nombre aléatoire entre minValue et maxValue (inclus) et renvoie le résultat
     * @memberof app
     * @method getRandomNumber
     * @param {Number} minValue 
     * @param {Number} maxValue 
     * @returns {Number} randomNumber
     */
    getRandomNumber: function (minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    },

    /**
     * Génère deux nombres aléatoires entre minValue et maxValue (inclus) et renvoie le résultat sous forme d'objet
     * @memberof app
     * @method getTwoNumbers
     * @param {Number} minValue 
     * @param {Number} maxValue 
     * @return {MinMaxObj} Un objet avec les clefs min et max
     */
    getTwoNumbers: function (minValue, maxValue) {
        let number1 = core.getRandomNumber(minValue, maxValue);
        let number2 = core.getRandomNumber(minValue, maxValue);
        // just a check to ensure numbers are differents
        while (number1 == number2) {
            number2 = core.getRandomNumber(minValue, maxValue);
        }
        // return result as an objet
        return {
            min: Math.min(number1, number2),
            max: Math.max(number1, number2)
        };
    },

    /**
     * Ecrit et affiche le message dans #resultMessage et masque le pot
     * @memberof app
     * @method showResults
     * @param {String} message 
     */
    showResults: function (message) {
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('resultMessage').textContent = message;
        document.getElementById('potContainer').classList.add('hidden');
        document.querySelector("#newRound").classList.remove('hidden')
    },

    /** 
    * Fin du code fourni. 
    **/
};