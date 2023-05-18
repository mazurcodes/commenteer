export const convertListToLines = (text: string) => {
  return text.replace(/\n[\d•]+\.\s/g, '\n');
};
