export const matchesSearch = (
  qRaw: string,
  c: {name: string; symbol: string},
) => {
  const q = qRaw.trim().toLowerCase();
  if (!q) {
    return true;
  }
  const name = c.name.toLowerCase();
  const symbol = c.symbol.toLowerCase();
  if (name.startsWith(q)) {
    return true;
  }
  if (name.includes(' ' + q)) {
    return true;
  }
  if (symbol.startsWith(q)) {
    return true;
  }
  return false;
};
