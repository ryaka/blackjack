var uuid = require('node-uuid');

class Deck {
  constructor(options = {}) {
    this._cards = [];
    this.deck = [];
    this.drawnCards = [];

    this.id = uuid.v4();

    //Add default algorithm to use. Pull algorithms from a module and user
    //passes in a string?
    this.shuffleAlgorithm = options.shuffleAlgorithm || (_ => _);
  }

  _claimDeckOwnership() {
    this._cards.forEach(c => c.addDeckOwnership(this.id));
  }

  _unclaimDeckOwnership() {
    this._cards.forEach(c => c.removeDeckOwnership(this.id));
  }

  //Puts all cards back into the deck and shuffles the deck
  //According to the input algorithm.
  //Returns itself for method chaining.
  shuffle () {
    this.deck = this._cards.map((card) => card);

    this.deck = this.shuffleAlgorithm(this.deck);

    this.drawnCards = [];

    return this;
  }

  //Draws cards in their natural order.
  //Returns a drawn card or throws exception if deck is empty.
  drawCard () {
    if(!this.deck.length) {
      //TODO add exception and log
      return;
    }
    let drawnCard = this.deck.pop();

    //Update trackers, maybe add logs for sanity check
    this.drawnCards.push(drawnCard);

    return drawnCard;
  }

  //Remove card from the current deck no matter its position.
  //Returns boolean value for success.
  removeCard (card) {
    let cardIndex = this.deck.indexOf(card);
    if (cardIndex > -1) {this.deck.splice(cardIndex, 1);
      this.drawnCards.push(card);

      return true;}
    return false;
  }

  //Add card from the drawn card pile back into the deck.
  //Returns boolean value for success.
  addCard (card) {
    if(this._cards.indexOf(card) > -1 && this.drawnCards.indexOf(card) > -1) {
      let cardIndex = this.drawnCards.indexOf(card);
      this.drawnCards.splice(cardIndex, 1);

      this.deck.push(card);

      return true;
    }

    return false;
  }
}
export default Deck;
