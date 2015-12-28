var expect = require('chai').expect;

import StandardDeck from '../../src/decks/StandardDeck.js';
import MultiStandardDeck from '../../src/decks/MultiStandardDeck.js';

let deck, deckCards, subdeckCards;
let numOfDecks = 4;

function retrieveDeckCardOrder(d) {
  return d.deck.map(c => c);
}

function retrieveSubdeckCardOrder(md) {
  return md._decks.map(retrieveDeckCardOrder);
}

beforeEach(() => {
  deck = new MultiStandardDeck({numOfDecks: numOfDecks})

  deckCards = retrieveDeckCardOrder(deck);
  subdeckCards = retrieveSubdeckCardOrder(deck);
});

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

  describe('shuffle', () => {
    function fisherYates(deck, numOfShuffles = 10) {
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      for (let shuffle = 0; shuffle < numOfShuffles; shuffle++) {
        for(let i = 0; i < deck.length; i++) {
          var swapIndex = getRandomInt(0, i);
          var tempVal = deck[swapIndex];
          deck[swapIndex] = deck[i];
          deck[i] = tempVal;
        }
      }

      return deck;
    }

    it('should shuffle the overall deck and push command to subdecks', () => {
      deck = new MultiStandardDeck({
        shuffleAlgorithm: fisherYates
      });

      deck.shuffleAlgorithm = fisherYates;

      deck.shuffle();

      deckCards = retrieveDeckCardOrder(deck);
      subdeckCards = retrieveSubdeckCardOrder(deck);

      deck.shuffle();

      //The overall and subdeck states should be different
      expect(deckCards).to.not.deep.equal(deck.deck);
      for(let i = 0; i < numOfDecks; i++) {
        let standardDeck = deck._decks[i];
        let subdeck = deck._decks[i];
        expect(subdeckCards[i]).to.not.deep.equal(subdeck.deck);
      }
    });
  });

});
