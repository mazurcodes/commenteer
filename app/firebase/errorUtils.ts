export const extractFirebaseErrorMessage = (errorMessage: string) => {
  return errorMessage
    ? errorMessage
        .split('(')[1]
        .split('/')[1]
        .split(')')[0]
        .split('-')
        .join(' ')
    : '';
};
