var DELIMITER = process.platform === 'win32' ? ';' : ':';

function filterNone() {
  return true;
}

module.exports = function prepend(pathString, path, options) {
  options = options || {};
  var delimiter = options.delimiter === undefined ? DELIMITER : options.delimiter;
  var changes = { added: [], removed: [] };
  var pathParts = pathString.split(delimiter);
  var filter = options.filter || filterNone;

  // add to start
  if (!pathParts.length || pathParts[0] !== path) {
    changes.added.push(path);
    pathParts.unshift(path);
  }

  // remove duplicates
  for (var index = 1; index < pathParts.length; index++) {
    var pathPart = pathParts[index];

    // remove
    if (~pathPart.indexOf(path) || !filter(pathPart)) {
      changes.removed.push(pathPart);
      pathParts.splice(index, 1);
      index--;
    }
  }

  changes.path = pathParts.join(delimiter);
  return options.changes ? changes : changes.path;
};
