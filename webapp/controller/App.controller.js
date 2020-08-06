sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.mjzsoft.smp13n.com0mjzsoft0smp13n.controller.App", {

		onInit : function () {
			sap.ui.getCore().getEventBus().subscribe("App", "StartAppBusy",  this.startAppBusy, this);
			sap.ui.getCore().getEventBus().subscribe("App", "StopAppBusy",   this.stopAppBusy, this);
			
			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			oViewModel = new JSONModel({
				busy : true,
				delay : 0
			});
			this.setModel(oViewModel, "appView");

			fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			// disable busy indication when the metadata is loaded and in case of errors
			this.getOwnerComponent().getModel().metadataLoaded().
				then(fnSetAppNotBusy);
			this.getOwnerComponent().getModel().attachMetadataFailed(fnSetAppNotBusy);

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
		},
		
		getViewModel: function () {
			return this.getModel("appView");
		},
		
		onNavigate: function () {
			this.getViewModel().setProperty("/busy", true);
		},
		
		onAfterNavigate: function () {
			this.getViewModel().setProperty("/busy", false);
		},
		
		stopAppBusy : function()
		{
			this.getViewModel().setProperty("/busy", false);
		},
		
		startAppBusy : function()
		{
			this.getViewModel().setProperty("/busy", true);
		}
	});

});