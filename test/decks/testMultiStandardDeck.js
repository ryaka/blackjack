var expect = require('chai').expect;

import StandardDeck from '../../src/decks/StandardDeck.js';
import MultiStandardDeck from '../../src/decks/MultiStandardDeck.js';

let deck, deckCards, subdeckCards, drawnCards, subdeckDrawnCards;
let numOfDecks = 4;

function retrieveDeckCardOrder(d) {
  return d.deck.map(c => c);
}

function retrieveSubdeckCardOrder(md) {
  return md._decks.map(retrieveDeckCardOrder);
}

function retrieveDeckDrawnCardOrder(d) {
  return d.drawnCards.map(c => c);
}

function retrieveSubdeckDrawnCardOrder(md) {
  return md._decks.map(retrieveDeckDrawnCardOrder);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fisherYates(deck, numOfShuffles = 10) {
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
      expect(standardDecks).to.have.length(numOfDecks);

      let pokerCards = standardDecks.reduce((interDeck, sd) => {
        return interDeck.concat(sd.deck);
      }, []);

      pokerCards.forEach(card => expect(card.isOwnedByDeck(deck.id)).to.be.true);
    });
  });

  describe('shuffle', () => {
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
      expect(deckCards).to.not.deep.equal(retrieveDeckCardOrder(deck));
      expect(subdeckCards).to.not.deep.equal(retrieveSubdeckCardOrder(deck));
    });
  });

  describe('drawCard', () => {
    it('should draw card from the overall deck and update status to subdecks', () => {
      deck.drawCard();
      expect(deckCards).to.not.deep.equal(retrieveDeckCardOrder(deck));
      expect(subdeckCards).to.not.deep.equal(retrieveSubdeckCardOrder(deck));
    });
  });

  describe('removeCard', () => {
    it('should remove card from the overall deck and update status to subdecks', () => {
      let someCard = deck.deck[5];
      deck.removeCard(someCard);

      //Card should no longer be in any of the decks
      expect(deck.deck).to.not.include(someCard);
      deck._decks.forEach(d => expect(d.deck).to.not.include(someCard));

      //Let's update all our card references and do some checks
      deckCards = retrieveDeckCardOrder(deck);
      subdeckCards = retrieveSubdeckCardOrder(deck);

      //Let's check our arithmetic
      let totalNumOfCards = numOfDecks * 52;
      let expectedCardsInPlay = totalNumOfCards - 1;
      expect(deckCards).to.have.length(expectedCardsInPlay);
      let currentNumOfSubdeckCards = subdeckCards.reduce((totalSum, sd) => totalSum + sd.length, 0);
      expect(currentNumOfSubdeckCards).to.equal(expectedCardsInPlay);

      //Let's check to see that it is in the drawn pile, and only once
      //because we have only removed one card so far
      drawnCards = retrieveDeckDrawnCardOrder(deck);
      subdeckDrawnCards = retrieveSubdeckDrawnCardOrder(deck);

      //Proceed to check multideck drawn cards
      expect(drawnCards).to.include(someCard);
      expect(drawnCards).to.have.length(1);

      //Proceed to check subdeck drawn cards
      let mergedSubdeckDrawnCards = subdeckDrawnCards.reduce((interDeck, sdc) => interDeck.concat(sdc), []);
      expect(mergedSubdeckDrawnCards).to.include(someCard);
      expect(mergedSubdeckDrawnCards).to.have.length(1);
    });
  });

  describe('addCard', () => {
    it('should add card from the overall deck and update status to subdecks', () => {
      let subDeckNumber = getRandomInt(0, numOfDecks - 1);
      let randomCardNumber = getRandomInt(0, 51);

      //Let's remove the card manually from the multideck and subdeck
      //and place it in their drawn pile
      let randomCard = subdeckCards[subDeckNumber][randomCardNumber];

      let randomSubdeck = deck._decks[subDeckNumber];
      randomSubdeck.deck.splice(randomCardNumber, 1);
      randomSubdeck.drawnCards.push(randomCard);

      let multideckCardPosition = deck.deck.indexOf(randomCard);
      deck.deck.splice(multideckCardPosition, 1);
      deck.drawnCards.push(randomCard);

      //Let the games begin...
      deck.addCard(randomCard);

      deckCards = retrieveDeckCardOrder(deck);
      subdeckCards = retrieveSubdeckCardOrder(deck);
      drawnCards = retrieveDeckDrawnCardOrder(deck);
      subdeckDrawnCards = retrieveSubdeckDrawnCardOrder(deck);

      expect(deckCards).to.include(randomCard);
      expect(deckCards).to.have.length(numOfDecks * 52);
      expect(drawnCards).to.not.include(randomCard);
      expect(drawnCards).to.be.empty

      let mergedSubdeckCards = subdeckCards.reduce((interDeck, sdc) => interDeck.concat(sdc), []);
      let mergedSubdeckDrawnCards = subdeckDrawnCards.reduce((interDeck, sdc) => interDeck.concat(sdc), []);
      expect(mergedSubdeckCards).to.include(randomCard);
      expect(mergedSubdeckCards).to.have.length(numOfDecks * 52);
      expect(mergedSubdeckDrawnCards).to.not.include(randomCard);
      expect(mergedSubdeckDrawnCards).to.be.empty;
    });
  });

});
