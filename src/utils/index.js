export const getFirstCharacterOfName = (fullName) => {
  const words = fullName.trim().split(' ');
  return words[words.length - 1][0];
};
