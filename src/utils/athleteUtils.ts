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