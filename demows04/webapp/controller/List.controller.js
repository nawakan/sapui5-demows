sap.ui.define([
    "demows04/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows04.controller.List", {
            onInit: function () {

            },
            onCreateNew: function(){
                this.getRouter().navTo("CreateRO", {});
            },
            onSelectionChange: function(oEvent){
                var selectedItem = oEvent.getParameters().listItem,
                vOrderId = selectedItem.getBindingContext().getProperty("OrderID");
                this.getRouter().navTo("DetailRO", { orderid: vOrderId });
            }
        });
    });
