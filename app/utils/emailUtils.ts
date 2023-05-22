export const shortEmailAddress = (email = '', maxChars = 50) => {
  let beforeAt = email.split('@')[0];
  let afterAt = email.split('@')[1];
  const calcAdditionalSpaceBefore = maxChars / 2 - beforeAt.length;
  const calcAdditionalSpaceAfter = maxChars / 2 - afterAt.length;
  const additionalSpaceBefore =
    calcAdditionalSpaceBefore > 0 ? calcAdditionalSpaceBefore : 0;
  const additionalSpaceAfter =
    calcAdditionalSpaceAfter > 0 ? calcAdditionalSpaceAfter : 0;

  if (email.length > maxChars) {
    if (beforeAt.length > maxChars / 2) {
      beforeAt =
        beforeAt.substring(0, maxChars / 2 - 4 + additionalSpaceAfter) + '...';
    }
    if (afterAt.length > maxChars / 2) {
      afterAt =
        '...' +
        afterAt.substring(
          afterAt.length - maxChars / 2 + 4 - additionalSpaceBefore
        );
    }
    return beforeAt + '@' + afterAt;
  }
  return email;
};
