sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows10.controller.View1", {
            onInit: function () {

            },
            onResetRating: function(){
                this.byId("productrating").reset();
            },
            onClear: function(){
                this.byId("signaturepad").clearSignature();
            }
        });
    });
