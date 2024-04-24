"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return prepend;
    }
});
require("./polyfills.js");
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function filterNone() {
    return true;
}
function prepend(pathString, prependPath, options) {
    options = options || {};
    var delimiter = options.delimiter || _path.default.delimiter;
    var changes = {
        added: [],
        removed: []
    };
    var parts = pathString.split(delimiter);
    var filter = options.filter || filterNone;
    // add to start
    if (!parts.length || parts[0] !== prependPath) {
        changes.added.push(prependPath);
        parts.unshift(prependPath);
    }
    // remove duplicates
    for(var index = 1; index < parts.length; index++){
        var prependPathPart = parts[index];
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
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }