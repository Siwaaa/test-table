export const generateSortTableDataKeyGetter = (key) => {
  let keyGetter = i => i;

  if (key === 'product') {
    console.log(777);
    keyGetter = i => i[key].toLowerCase();
  }

  keyGetter = i => i[key];

  return keyGetter;
}



export const clearOrSelectAllRows = (rows, forceAll) => {
  if (rows) {
    if (forceAll) {
      rows.forEach((row, idx) => {
        if (idx === 0) {
          row.$parent.isChecked = true;
        }

        row.isChecked = true;
      });

      return;
    }

    rows.forEach((row, idx) => {
      if (idx === 0) {
        row.$parent.isChecked = false;
      }

      row.isChecked = false;
    });
  }
}