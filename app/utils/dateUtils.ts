import { Timestamp } from 'firebase/firestore';

export function convertTimestampToDate(timestamp: Timestamp) {
  const isoDate = timestamp.toDate().toISOString();
  return convertISOToGiftDate(isoDate);
}

function convertISOToGiftDate(isoDate: string) {
  return isoDate.split('T')[0].split('-').reverse().join('.');
}
