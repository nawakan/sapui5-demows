sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("demows01.controller.View1", {
            onInit: function () {

            },
            onPress: function(){
                MessageToast.show("Hello "+this.byId("nameinput").getValue(),{duration:1000});
            }
        });
    });
