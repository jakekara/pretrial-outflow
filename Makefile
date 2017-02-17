bundle.min.js: bundle.js
	uglifyjs js/bundle.js -o js/bundle.min.js

bundle.js: js/main.js
	browserify js/main.js -o js/bundle.js
