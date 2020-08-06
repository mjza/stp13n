/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/mjzsoft/smp13n/com0mjzsoft0smp13n/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});