var fs, lastLoads, loader, path;

fs = require('fs');

path = require('path');

lastLoads = {};

module.exports = function(folderPath) {
  lastLoads = {};
  loader(folderPath);
  return lastLoads;
};

loader = function(folderPath) {
  var files;
  return files = fs.readdirSync(folderPath).forEach(function(file) {
    var fileName, filePath, loadedFile, stat;
    filePath = folderPath + "/" + file;
    stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        if (path.extname(file) === ".coffee") {
          fileName = path.basename(file, ".coffee");
          loadedFile = require(path.join(folderPath, fileName));
          return lastLoads[fileName] = loadedFile;
        }
      }
    } else {
      return loadFiles(filePath);
    }
  });
};