import path from 'path';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const pathDelimiter = path.delimiter ? path.delimiter : isWindows ? ';' : ':';

const filterNone = (_path?: string) => true;

export interface PrependResult {
  added: string[];
  removed: string[];
  path: string;
}

export interface PrependOptions {
  delimiter?: string;
  filter?: (_path?: string) => boolean;
  changes?: boolean;
}

export default function prepend(pathString: string, prependPath: string, options: PrependOptions = {}): PrependResult | string {
  const delimiter = options.delimiter || pathDelimiter;
  const changes = { added: [], removed: [], path: '' };
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
