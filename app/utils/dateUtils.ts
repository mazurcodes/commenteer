// import { Timestamp } from 'firebase/firestore';

import { Timestamp } from 'firebase/firestore';

//TODO: check if Timestamp is not a object {seconds: 0, nanoseconds: 0}
// for now timestamp is converted to this object ^^ coz of JSON.stringify
export function convertTimestampToDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}) {
  const isoDate = new Timestamp(timestamp.seconds, timestamp.nanoseconds)
    .toDate()
    .toISOString();
  return convertISOToCommenteerDate(isoDate);
}

export function convertDateToCommenteerDate(date: number) {
  const isoDate = new Date(date).toISOString();
  return convertISOToCommenteerDate(isoDate);
}

function convertISOToCommenteerDate(isoDate: string) {
  return isoDate.split('T')[0].split('-').reverse().join('.');
}
