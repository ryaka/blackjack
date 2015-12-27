var expect = require('chai').expect;

import Deck from '../../src/decks/Deck.js';

let deck;
beforeEach(() => deck = new Deck());

describe('Deck', () => {
  describe('constructor', () => {
    it('should have empty list for intial card data holders', () => {
      expect(deck._cards).to.deep.equal([]);
      expect(deck.deck).to.deep.equal([]);
      expect(deck.drawnCards).to.deep.equal([]);
    });
  });

  describe('drawCard', () => {
    it('should throw exception when deck is empty', () => {
      //TODO
    });

    it('should return card from end of deck and update deck and drawn cards', () => {
      let testDeck = [1, 2, 3, 4, 5, 6,];
      deck.deck = testDeck;

      let drawnCard = deck.drawCard();

      expect(drawnCard).to.equal(6);
      expect(deck.deck).to.deep.equal([1, 2, 3, 4, 5,]);
      expect(deck.drawnCards).to.deep.equal([6]);
    });
  });

  describe('removeCard', () => {
    let kittyCards;
    beforeEach(() => {
      kittyCards = ['milo', 'mila', 'datwan',];
      deck._cards = kittyCards
    });

    it('should return false when unable to remove a card from the deck', () => {
      //deck is currently empty
      expect(deck.removeCard(1)).to.equal(false);

      deck.deck = deck._cards.map(_ => _);

      //card is not in the deck
      expect(deck.removeCard(1)).to.equal(false);
    });

    it('should return true able to remove card from deck', () => {
      deck.deck = deck._cards.map(_ => _);

      let someCard = deck._cards[0];

      expect(deck.removeCard(someCard)).to.equal(true);
    });
  });

  describe('addCard', () => {
    let kittyCards;
    beforeEach(() => {
      kittyCards = ['milo', 'mila', 'datwan',];
      deck._cards = kittyCards
    });

    it('should not add card if card is not in known cards list', () => {
      //force a card into the drawnPile
      let fakeCat = 'notacat';
      deck.drawnCards.push(fakeCat);

      //card still not in known list
      expect(deck.addCard(fakeCat)).to.equal(false);
    });

    it('should not add card if card is known but not in drawn pile', () => {
      let someCat = deck.deck[0];
      expect(deck.addCard(someCat)).to.equal(false);
    });

    it('should add card if card is known card and in drawn pile', () => {
      let someCat = deck._cards[0];
      deck.drawnCards.push(someCat);

      expect(deck.addCard(someCat)).to.equal(true);
    });

  });

  describe('shuffle', () => {
    let kittyCards;
    beforeEach(() => {
      kittyCards = ['milo', 'mila', 'datwan',];
      deck._cards = kittyCards
    });

    it('should reset deck to all cards and drawn cards to empty', () => {
      //Sanity check first
      expect(deck._cards).to.equal(kittyCards);
      expect(deck.deck).to.deep.equal([]);
      expect(deck.drawnCards).to.deep.equal([]);

      deck.shuffle();

      expect(deck._cards).to.equal(kittyCards);
      expect(deck.deck).to.deep.equal(kittyCards);
      expect(deck.drawnCards).to.eql([]);
    });

    it('should run deck through the shuffle algorithm', () => {
      function secretShuffleAlgorithm(d) {
        if (d.length) {
          let lastIndex = d.length - 1;
          let tempHolder = d[0];
          d[0] = d[lastIndex];
          d[lastIndex] = tempHolder;
        }
        return d;
      }

      //Sanity check first
      expect(deck._cards).to.equal(kittyCards);
      expect(deck.deck).to.deep.equal([]);
      expect(deck.drawnCards).to.deep.equal([]);

      deck.shuffleAlgorithm = secretShuffleAlgorithm;
      deck.shuffle();
      let shuffledCards = kittyCards.map(_ => _);
      shuffledCards = secretShuffleAlgorithm(shuffledCards);

      //should have run through the shuffling algorithm
      expect(deck.deck).to.not.deep.equal(kittyCards);
      expect(deck.deck).to.deep.equal(shuffledCards);
    });
  });
});
