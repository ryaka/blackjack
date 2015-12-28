import Deck from './Deck';
import StandardDeck from './StandardDeck';

class MultiStandardDeck extends Deck {
  constructor(options = {}) {
    super(options);

    this._decks = [];
    let numOfDecks = options.numOfDecks || 6;
    for (let i = 0; i < numOfDecks; i++) {
      this._decks.push(new StandardDeck(options));
    }

    this._cards = this._decks.reduce((myDeck, d) => myDeck.concat(d.deck), []);

    this.deck = this._cards.map(card => card);

    this._claimDeckOwnership();
  }

  //Puts all cards back into the deck and shuffles the deck
  //According to the input algorithm.
  //Returns nothing.
  shuffle() {
    this._decks.forEach(deck => deck.shuffle())
    return super.shuffle();
  }

  //Draws cards in their natural order.
  //Returns a drawn card or throws exception if deck is empty.
  drawCard() {
    let drawnCard = super.drawCard();
    this._decks.forEach(deck => deck.removeCard(drawnCard));
    return drawnCard;
  }

  //Remove card from the current deck no matter its position.
  //Returns boolean value for success.
  removeCard(card) {
    this._decks.forEach(deck => deck.removeCard(card));
    return super.removeCard(card);
  }

  //Add card from the drawn card pile back into the deck.
  //Returns boolean value for success.
  addCard(card) {
    this._decks.forEach(deck => deck.addCard(card));
    return super.addCard(card);
  }
}
export default MultiStandardDeck;
