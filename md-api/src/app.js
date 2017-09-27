var Handlers = require("./handlers.js");

function app() {
  Handlers.setupEvents();
}

// window.app = app;
window.onload = function() {
  app();
};
