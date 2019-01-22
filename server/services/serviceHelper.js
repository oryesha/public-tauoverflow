
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

exports.updateList = function(oldList, newList) {
  newList.forEach((id) => {
    if (oldList.indexOf(id) === -1) {
      oldList.push(id);
    }
  });
};
