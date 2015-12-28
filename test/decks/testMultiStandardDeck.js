var expect = require('chai').expect;

import StandardDeck from '../../src/decks/StandardDeck.js';
import MultiStandardDeck from '../../src/decks/MultiStandardDeck.js';

let deck;
let numOfDecks = 4;
beforeEach(() => deck = new MultiStandardDeck({numOfDecks: numOfDecks}));

describe('MultiStandardDeck', () => {
  describe('constructor', () => {
    it('should create a multistandard poker deck', () => {
      let standardDecks = deck._decks;
      standardDecks.forEach(d => expect(d).to.be.an.instanceof(StandardDeck));
      expect(standardDecks.length).to.equal(numOfDecks);

      let pokerCards = standardDecks.reduce((interDeck, sd) => {
        return interDeck.concat(sd.deck);
      }, []);

      pokerCards.forEach(card => expect(card.isOwnedByDeck(deck.id)).to.be.true);
    });
  });
});
