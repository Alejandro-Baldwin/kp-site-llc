//call the file where the tasks lives in

const watch = require('./gulp/tasks/watch.js');
const style = require('./gulp/tasks/style.js');
const scripts = require('./gulp/tasks/scripts.js');
const build = require('./gulp/tasks/build.js');
const icons = require('./gulp/tasks/sprites.js');

//export the task within the file to be runned trought gulp command line

exports.style = style.style;
exports.watch = watch.watch;
exports.scripts = scripts.scripts;
exports.build = build.build;
exports.icons = icons.icons;