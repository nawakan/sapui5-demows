sap.ui.define([
    "demows09/controller/BaseController",
    "demows09/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter) {
        "use strict";

        return Controller.extend("demows09.controller.List", {

            formatter: Formatter,

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
