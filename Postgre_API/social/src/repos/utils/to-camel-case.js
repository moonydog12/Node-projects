module.exports = (rows) => {
  return rows.map((row) => {
    const replacedRows = {};

    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', '')
      );
      replacedRows[camelCase] = row[key];
    }
    return replacedRows;
  });
};
