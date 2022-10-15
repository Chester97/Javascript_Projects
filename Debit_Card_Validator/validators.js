const validateCardLength = (cardNumber, cardDetails) =>
  cardDetails
    .map((cardType, i) => {
      const cardByLength = cardType.cardLength
        .map((el) => el === cardNumber.length && cardDetails[i])
        .filter(Boolean);
      return cardByLength;
    })
    .flatMap((e) => e);

const validateCardByNumbers = (arrayOfValidatedCards, cardNumber) =>
  arrayOfValidatedCards
    .map((card) => {
      return card.startsWith
        .map((digit) => {
          const splittedDigit = digit.toString().split("");
          if (splittedDigit.length === 1) {
            return splittedDigit.join("") === cardNumber[0] ? card : null;
          }
          if (splittedDigit.length === 2) {
            return splittedDigit.join("") === cardNumber.slice(0, 2)
              ? card
              : null;
          }
          return null;
        })
        .filter(Boolean);
    })
    .flatMap((e) => e);

module.exports = { validateCardByNumbers, validateCardLength };
