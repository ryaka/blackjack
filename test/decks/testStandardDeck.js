var expect = require('chai').expect;

import StandardDeck from '../../src/decks/StandardDeck.js';
import StandardCard from '../../src/cards/StandardCard.js';

const SUITS = ['♥', '♦', '♠', '♣',];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];

let deck;
beforeEach(() => deck = new StandardDeck());

describe('StandardDeck', () => {
  describe('constructor', () => {
    it('should create a standard poker deck', () => {
      let pokerDeck = [];

      SUITS.forEach(suit => {
        RANKS.forEach(rank => {
          pokerDeck.push(new StandardCard({
            suit: suit,
            rank: rank,
            decks: []
          }));
        });
      });

      //Sort all the decks so they have the same order
      deck._cards.sort();
      deck.deck.sort();
      pokerDeck.sort();

      expect(pokerDeck) expect(pokerDeck).to.deep.equal(deck.deck);
    });
  });
});
