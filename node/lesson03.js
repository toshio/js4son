var fs     = require('fs');
var path   = require('path');

/**
 * finds files
 * @param parent target directory
 * @param filter function for filtering
 * @param action function for an matched file
 */
function findFiles(parent, filter, action) {
	var files = fs.readdirSync(parent);

	files.forEach(function(file) {
		var child = path.join(parent, file);
		var stats = fs.statSync(child);
		if (stats.isDirectory()) {
			findFiles(child, filter, action);
		} else if (stats.isFile() && filter(file)) {
			action(child);
		}
	});
}

findFiles(
	"..",
	function(file) {
		return /.*\.js$/.test(file);
	},
	function(path) {
		console.log(path);
	});
