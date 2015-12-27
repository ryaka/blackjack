class StandardCard {
  constructor(options) {
    this.suit = options.suit;
    this.rank = options.rank;
    this._decks = options.decks || [];
  }

  addDeckOwnership (id) {
    if(this.isOwnedByDeck(id)) {return false;}
    this
      ._decks
      .push(id);
    return true;
  }

  removeDeckOwnership (id) {
    if(this.isOwnedByDeck(id)) {
      let idIndex = this._decks.indexOf(id);
      this._decks.splice(idIndex, 1);
      return true;
    }
    return false;
  }

  isOwnedByDeck (id) {
    return this
      ._decks
      .indexOf(id) > -1;
  }
}
export default StandardCard;
