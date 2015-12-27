import StandardCard from '../cards/StandardCard';
import Deck from './Deck'

const SUITS = ['♥', '♦', '♠', '♣',];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];

class StandardDeck extends Deck {
  constructor(options = {}) {
    super(options);

    this._cards = SUITS.reduce((interDeck, suit) => {
      let cardsOfSuit = RANKS.map(rank => {
        return new StandardCard({rank: rank, suit: suit});
      });

      return interDeck.concat(cardsOfSuit);
    }, []);

    this.deck = this._cards.map(card => card);
  }
}
export default StandardDeck;
