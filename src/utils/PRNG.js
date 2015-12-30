//Module / class that stitches together all the prng in common interface
class PRNG {
  constructor(options = {}) {
    this._internalAlgorithms = {
      GRC: require('random-seed').create(),
      Math: Math
    };

    this.algorithm = this.changeAlgorithmTo(options.algorithm) || this.changeAlgorithmTo('GRC');
    this.seed(options.seed);
  }

  getAvailableAlgorithms() {
    return Object.keys(this._internalAlgorithms);
  }

  changeAlgorithmTo(algorithm) {
    this.algorithm = this._internalAlgorithms[algorithm] || this._internalAlgorithms['GRC'];
    return this.algorithm;
  }

  seed(seed) {
    //Should we be able to seed with undefined?
    if (this.algorithm.seed) {
      this.algorithm.seed(seed);
    }
  }

  random() {
    return this.algorithm.random();
  }

  getRandomInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

}
export default PRNG;
