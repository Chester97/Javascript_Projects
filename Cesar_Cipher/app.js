import { ALPHABET } from 'ALPHABET.JS'

function cesar36(x) {
  const arrayOfLetters = [...x];
  const alphaLength = ALPHABET.length;

  return arrayOfLetters.reduce((acc, next) => {
    const indexInAlpha = ALPHABET.indexOf(next.toUpperCase());
    const newIndex = indexInAlpha + 13;
    if (newIndex > alphaLength) {
      return (acc += ALPHABET[newIndex - alphaLength]);
    }
    if (newIndex === alphaLength) {
      return (acc += ALPHABET[0]);
    }
    return (acc += ALPHABET[newIndex]);
  }, "");
}
console.log(cesar36("LONGSTRING"));
