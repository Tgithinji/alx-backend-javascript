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
      if (text !== '') text += '-';

      text += extractedString;
    }
  }

  return text;
}
