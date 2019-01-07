
exports.getIdsFromList = function(list) {
  const res = [];
  if (list === undefined || list.length == 0) {
    return res;
  }
  list.forEach(function (listItem) {
    const id = listItem.id;
    res.push(id);
  });
  return res;
};
