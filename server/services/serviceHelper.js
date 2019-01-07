
exports.getIdsFromList = function(list) {
  const res = [];
  list.forEach(function (listItem) {
    const id = listItem.id;
    res.push(id);
  });
  return res;
};
