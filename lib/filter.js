const match = require("minimatch");
const evaluate = require("./eval");

module.exports = (files, filters, data, done) => {
  if (!filters) {
    return done();
  }
  const fileNames = Object.keys(files);
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(fileName => {
      if (match(fileName, glob, { dot: true })) {
        const condition = filters[glob];
        if (!evaluate(condition, data)) {
          delete files[fileName];
        }
      }
    });
  });
  done();
};
