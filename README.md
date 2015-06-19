If you want to build on your own

babel --module amd rapr.js > dist/rapr.js

Who needs build tools anyways.

If you don't have babel: npm install -g babel

Tests don't use ES6 because I don't feel like building them/using a build tool.

Currently tests work something like "if you don't get an error in the console, things might work"

Whereas if you get an error in the console, things most certainly do not. Some day, we will ascend
to greater heights in testing, using jasmine or something of the sort.