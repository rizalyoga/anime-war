const count_of_dect = (decks) => {
  const typeCard = ["S", "C", "D", "H"];
  const valueCard = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  let totalPerDecks = 52;
  let countDeck = 0;

  let deck = [];
  for (let i = 0; i < valueCard.length; i++) {
    for (let j = 0; j < typeCard.length; j++) {
      deck.push(valueCard[i] + typeCard[j]);
    }
  }

  const equals = (a, b) => {
    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (j >= totalPerDecks) {
          countDeck += 1;
          totalPerDecks += 51;
        }
      }
      if (i > 51) {
        i = 0;
      }
    }
  };
  equals(decks, deck);

  if (countDeck == 0) {
    return 0;
  } else if (countDeck >= 1) {
    // console.log(countDeck);

    let obj = {};

    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < decks.length; j++) {
        if (decks[i] == decks[j]) {
          obj[decks[j]] = j + 1 - j;
        }
      }
    }
    console.log(obj);
    return countDeck;
  }
};

console.log(
  count_of_dect([
    "2S",
    "2C",
    "2D",
    "2H",
    "3S",
    "3C",
    "3D",
    "3H",
    "4S",
    "4C",
    "4D",
    "4H",
    "5S",
    "5C",
    "5D",
    "5H",
    "6S",
    "6C",
    "6D",
    "6H",
    "7S",
    "8H",
    "9S",
    "9C",
    "9D",
    "9H",
    "TS",
    "TC",
    "TD",
    "TH",
    "JS",
    "JC",
    "JD",
    "JH",
    "QS",
    "QC",
    "QD",
    "QH",
    "KS",
    "KC",
    "KD",
    "KH",
    "AS",
    "AC",
    "AD",
    "2S",
    "2C",
    "2D",
    "2H",
    "3S",
    "3C",
    "3D",
    "3H",
    "4S",
    "4C",
    "4D",
    "4H",
    "5S",
    "5C",
    "5D",
    "5H",
    "6S",
    "6C",
    "6D",
    "6H",
    "7S",
    "7C",
    "7D",
    "7H",
    "8S",
    "8C",
    "8D",
    "8H",
    "9S",
    "9C",
    "9D",
    "9H",
    "TS",
    "TC",
    "TD",
    "TH",
    "JS",
    "JC",
    "JD",
    "JH",
    "QS",
    "QC",
    "QD",
    "QH",
    "KS",
    "KC",
    "KD",
    "KH",
    "AS",
    "AC",
    "AD",
    "AH",
  ])
);

console.log(
  count_of_dect([
    "2S",
    "2C",
    "2D",
    "2H",
    "3S",
    "3C",
    "3D",
    "3H",
    "4S",
    "4C",
    "4D",
    "4H",
    "5S",
    "5C",
    "5D",
    "5H",
    "6S",
    "6C",
    "6D",
    "6H",
    "7S",
    "7C",
    "7D",
    "7H",
    "8S",
    "8C",
    "8D",
    "8H",
    "9S",
    "9C",
    "9D",
    "9H",
    "TS",
    "TC",
    "TD",
    "TH",
    "JS",
    "JC",
    "JD",
    "JH",
    "QS",
    "QC",
    "QD",
    "QH",
    "KS",
    "KC",
    "KD",
    "KH",
    "AS",
    "AC",
    "AD",
    "AH",
  ])
);

console.log(
  count_of_dect([
    "2S",
    "2C",
    "2D",
    "2H",
    "3S",
    "3C",
    "3D",
    "3H",
    "4S",
    "4C",
    "4D",
    "4H",
    "5S",
    "5C",
    "5D",
    "5H",
    "6S",
    "6C",
    "6D",
    "6H",
    "7S",
    "7C",
    "7D",
    "7H",
    "8S",
    "8C",
    "8D",
    "8H",
    "9S",
    "9C",
    "9D",
    "9H",
    "TS",
    "TC",
    "TD",
    "TH",
    "JS",
    "JC",
    "JD",
    "JH",
    "QS",
    "QC",
    "QD",
    "QH",
    "KS",
    "KC",
    "KD",
    "KH",
    "AS",
    "AC",
    "AD",
    "AH",
    "2S",
    "2C",
    "2D",
    "2H",
    "3S",
    "3C",
    "3D",
    "3H",
    "4S",
    "4C",
    "4D",
    "4H",
    "5S",
    "5C",
    "5D",
    "5H",
    "6S",
    "6C",
    "6D",
    "6H",
    "7S",
    "7C",
    "7D",
    "7H",
    "8S",
    "8C",
    "8D",
    "8H",
    "9S",
    "9C",
    "9D",
    "9H",
    "TS",
    "TC",
    "TD",
    "TH",
    "JS",
    "JC",
    "JD",
    "JH",
    "QS",
    "QC",
    "QD",
    "QH",
    "KS",
    "KC",
    "KD",
    "KH",
    "AS",
    "AC",
    "AD",
    "AH",
  ])
);
