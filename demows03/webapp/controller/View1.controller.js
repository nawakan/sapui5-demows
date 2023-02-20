sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows03.controller.View1", {
            onInit: function () {
                var oJsonModel = new sap.ui.model.json.JSONModel("../data/companies.json");
                this.getView().setModel(oJsonModel);
            },
            onSelectionChange: function(oEvent){
                var oSelectedList = oEvent.getParameters().listItem;
                this.byId("SimpleFormDisplay354").bindElement(oSelectedList.getBindingContextPath());
            }
        });
    });
