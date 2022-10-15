const cardDetails = require('./validatorSchema');
const { validateCardByNumbers, validateCardLength } = require('./validators');

function checkCardType(cardNumber) {
  const cardByLengthResult = validateCardLength(cardNumber, cardDetails);

  const cardByNumbersResult = validateCardByNumbers(
    cardByLengthResult,
    cardNumber
  );

  return cardByNumbersResult.length ? cardByNumbersResult[0] : false;
}

function checkCardNumber(cardNumber) {
  const convertedCard = cardNumber.split("").map(Number);
  let newArr = [];
  let sum = 0;

  for (let i = convertedCard.length - 1; i >= 0; i--) {
    const nextToLast = convertedCard[convertedCard.length - 2];
    if (convertedCard[i] === nextToLast && i % 2 === 0) {
      newArr.push(String(2 * nextToLast));
    } else if (i % 2 === 0) {
      newArr.push(String(convertedCard[i] * 2));
    } else {
      sum += convertedCard[i];
    }
  }

  const res = newArr.reduce((acc, next) => {
    const currentValue = next.split("");
    const sumOfCurrentValue = currentValue.reduce(
      (acc, next) => (acc += +next),
      0
    );
    return (acc += sumOfCurrentValue);
  }, sum);

  return res % 10 === 0 ? true : false;
}

function validateCard(cardNumber) {
  const currentCard = checkCardType(cardNumber);
  if (!currentCard) return "Card is not valid.";
  const cardAfterNumberValidation = checkCardNumber(cardNumber);
  if (!cardAfterNumberValidation) return "Card is not valid.";

  return currentCard;
}

console.log(validateCard("5193080150954111"));
console.log(validateCard("4012888888881881"));
console.log(validateCard("4111111111111111"));
