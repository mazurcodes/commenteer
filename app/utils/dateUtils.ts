export function convertDateToCommenteerDate(date: number) {
  const isoDate = new Date(date).toISOString();
  return convertISOToCommenteerDate(isoDate);
}

function convertISOToCommenteerDate(isoDate: string) {
  return isoDate.split('T')[0].split('-').reverse().join('.');
}
