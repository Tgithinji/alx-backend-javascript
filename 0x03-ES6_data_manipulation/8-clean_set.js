export default function cleanSet(set, startString) {
  let text = '';

  // return an empty string if startstring is an empty string
  if (startString === '') return '';

  // loop through each value in the set to check if it
  // starts with the given word
  for (const word of set.values()) {
    if (word.startsWith(startString)) {
      // extract the  word after the startsWith
      const extractedString = word.slice(startString.length);
      // append the extracted word to a string
      text += `${extractedString}-`;
    }
  }

  // remove trailing '-' if text is not empty
  if (text.length > 0) text = text.slice(0, -1);

  return text;
}
