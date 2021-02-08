export function sortingByOrder(propertyGetter, order) {
  return (a, b) => {
    a = propertyGetter(a);
    b = propertyGetter(b);

    if (order === 'desc') {
      if (a > b) {
        return 1;
      }
    
      if (a < b) {
        return -1;
      }
    } else {
      if (a < b) {
        return 1;
      }
    
      if (a > b) {
        return -1;
      }
    }
  }
}