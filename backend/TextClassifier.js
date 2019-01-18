const negativeWords = "disappointed, miserable, sad, sorrow, unhappy".split(', ');
const positiveWords = "delight, delighted, delightful, happy, glad, joy, joyful, merry, pleasant".split(', ');

module.exports = class TextClassifier {
  constructor(pWords = positiveWords, nWords = negativeWords) {
    const positiveWordMap = TextClassifier.createMap(pWords);
    const negativeWordMap = TextClassifier.createMap(nWords);

    this.classifyText = this.classifyText.bind(this, positiveWordMap, negativeWordMap);
  }

  static createMap(words) {
    let map = {};
    words.forEach((word) => {
      map[word] = true;
    });
    return map;
  }

  // Returns an 2 item array containing the number of positive and negative words
  classifyText(posWordsMap, negWordsMap, text) {
    // Strip punctation and split the string into a word array
    const textArray = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' ');
    let positiveWordsCount = 0;
    let negativeWordsCount = 0;

    textArray.forEach((word) => {
      switch (true) {
        case posWordsMap[word]:
          positiveWordsCount++;
          break;
        case negWordsMap[word]:
          negativeWordsCount++;
          break;
      }
    });

    return [positiveWordsCount, negativeWordsCount];
  }
};