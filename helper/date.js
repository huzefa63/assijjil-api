export function getStartWeekDate() {
  const today = new Date();

  const current = new Date(today);
  const weekDay = today.getDay();
  if (weekDay !== 0) current.setDate(today.getDate() - weekDay + 1);
  if (weekDay === 0) current.setDate(today.getDate() - 6);

  const formattedDate = new Date(current);
  formattedDate.setHours(0, 0, 0, 0);

  return new Date(formattedDate);
}