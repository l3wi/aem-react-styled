var global = this;
global.setTimeout = function() {
	console.log("setTimeout is not implemented");
}
global.setInterval = function() {
	console.log("setInterval is not implemented");
}
global.clearInterval = function() {
	console.log("clearInterval is not implemented");
}
// initialize AemGlobal here instead of in server.tsx, which does not work reliably.
AemGlobal = {};

window ={}
// TODO a webpack fix for the server
global.webpackJsonp= function() {
	window.webpackJsonp.apply(global, arguments);
}