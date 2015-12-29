import PRNG from './PRNG.js';

function getInternalAlgorithm(algorithm, prng) {
  let internalAlgorithms = {
    FisherYates(deck) {
      for(let i = 0; i < deck.length; i++) {
        var swapIndex = prng.getRandomInt(0, i);
        var tempVal = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tempVal;
      }

      return deck;
    }
  };

  return internalAlgorithms[algorithm];
}

class Shuffler {
  constructor(options = {}) {
    this.prng = new PRNG(options.prng);
    this.algorithm = this.changeAlgorithmTo(options.algorithm) || this.changeAlgorithmTo('FisherYates');
  }

  getAvailableAlgorithms() {
    return Object.keys(internalAlgorithms);
  }

  changeAlgorithmTo(algorithm) {
    this.algorithm = getInternalAlgorithm(algorithm, this.prng);
    return this.algorithm;
  }

}
export default Shuffler;
