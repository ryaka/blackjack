import PRNG from './PRNG.js';

class Shuffler {
  constructor(options = {}) {
    this.prng = new PRNG(options.prng);

    this._internalAlgorithms = {
      FisherYates: (deck) => {
        for(let i = 0; i < deck.length; i++) {
          let swapIndex = this.prng.getRandomInt(0, i);
          [deck[i], deck[swapIndex]] = [deck[swapIndex], deck[i]];
        }
        return deck;
      }
    };

    this.algorithm = this.changeAlgorithmTo(options.algorithm);
  }

  getAvailableAlgorithms() {
    return Object.keys(this._internalAlgorithms);
  }

  changeAlgorithmTo(algorithm) {
    this.algorithm = this._internalAlgorithms[algorithm] || this._internalAlgorithms['FisherYates'];
    return this.algorithm;
  }

}
export default Shuffler;
