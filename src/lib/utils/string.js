export function generateRandomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function checkedColumnTitle(string) {
  if (string.toLowerCase() === 'products') {
    return 'product';
  }

  return string.toLowerCase();
}