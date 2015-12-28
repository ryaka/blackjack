var expect = require('chai').expect;

import StandardCard from '../../src/cards/StandardCard.js';

let card;
beforeEach(() => card = new StandardCard({
  suit: 'tuxedo',
  rank: 'upscale'
}));

describe('StandardCard', () => {
  let kittyOwner = 'mila';

  describe('addDeckOwnership', () => {
    it('should add and return true if owner we request to add isnt currently an owner', () => {
      expect(card._owners).to.not.include(kittyOwner);

      expect(card.addDeckOwnership(kittyOwner)).to.be.true;
      expect(card._owners).to.include(kittyOwner);
    });

    it('should return false if owner we request to add is already an owner', () => {
      card._owners.push(kittyOwner);

      expect(card.addDeckOwnership(kittyOwner)).to.be.false;
    });
  });

  describe('removeDeckOwnership', () => {
    it('should remove and return true if owner we request to remove is currently an owner', () => {
      card._owners.push(kittyOwner);

      expect(card.removeDeckOwnership(kittyOwner)).to.equal.true;
      expect(card._owners).to.not.include(kittyOwner);
    });

    it('should return false if owner we request to remove is not an owner', () => {
      expect(card.removeDeckOwnership(kittyOwner)).to.equal.false;
    });
  });
});
