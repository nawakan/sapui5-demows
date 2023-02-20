sap.ui.define([], function () {
	"use strict";
	return {

		formatDate: function(oDate) {
			if(!oDate) return;
            return oDate.toLocaleDateString();
		},

		freightState: function(vFreight, vShipVia){
			
			var vAmt = vFreight * vShipVia;

			if(vAmt<=50) return "Success";
			else if(vAmt<=100) return "Warning";
			else return "Error";
			
		}

	};
});