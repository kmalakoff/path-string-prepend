import './polyfills.cjs';

import path from 'path';

function filterNone() {
  return true;
}

export default function prepend(pathString, prependPath, options) {
  options = options || {};
  const delimiter = options.delimiter || path.delimiter;

  const changes = { added: [], removed: [] };
  const parts = pathString.split(delimiter);
  const filter = options.filter || filterNone;

  // add to start
  if (!parts.length || parts[0] !== prependPath) {
    changes.added.push(prependPath);
    parts.unshift(prependPath);
  }

  // remove duplicates
  for (let index = 1; index < parts.length; index++) {
    const prependPathPart = parts[index];

    // remove
    if (prependPathPart.indexOf(prependPath) >= 0 || !filter(prependPathPart)) {
      changes.removed.push(prependPathPart);
      parts.splice(index, 1);
      index--;
    }
  }

  changes.path = parts.join(delimiter);
  return options.changes ? changes : changes.path;
}
