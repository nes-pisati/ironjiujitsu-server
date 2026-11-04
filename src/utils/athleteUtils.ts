type DurationType = "annual"

export const getExpirationDate = (date: Date | null): Date | null => {
  if(date != null) {
    const start = new Date(date);
    const end = new Date(start);

    end.setFullYear(end.getFullYear() + 1)

    return end
  }

  return null;
};

export const getEnsuranceExpirationDate = (from: Date = new Date()): Date => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: 'numeric'
  }).formatToParts(from);

  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  const expirationYear = month > 8 ? year + 1 : year;

  return new Date(Date.UTC(expirationYear, 7, 31, 21, 59, 59, 999));
};