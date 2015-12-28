class StandardCard {
  constructor(options) {
    this.suit = options.suit;
    this.rank = options.rank;
    this._owners = options.owners || [];
  }

  addDeckOwnership(id) {
    if (this.isOwnedByDeck(id)) {
      return false;
    }
    this._owners.push(id);
    return true;
  }

  removeDeckOwnership(id) {
    if (this.isOwnedByDeck(id)) {
      let idIndex = this._owners.indexOf(id);
      this._owners.splice(idIndex, 1);
      return true;
    }
    return false;
  }

  isOwnedByDeck(id) {
    return this._owners.indexOf(id) > -1;
  }
}
export default StandardCard;
