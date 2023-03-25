sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows02.controller.View1", {
            onInit: function () {
                
                var oJson = new sap.ui.model.json.JSONModel("../data/datatest03.json");
                this.getView().setModel(oJson, "viewJsonModel");

            }
        });
    });
