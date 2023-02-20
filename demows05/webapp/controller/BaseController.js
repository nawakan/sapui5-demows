sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, History) {
        "use strict";

        return Controller.extend("demows05.controller.BaseController", {
            
            getRouter: function(){
                return UIComponent.getRouterFor(this);
            },

            getModel: function(sName){
                return this.getView().getModel(sName);
            },

            setModel: function(oModel, sName){
                return this.getView().setModel(oModel, sName);
            },

            onNavBack: function () {
                var oHistory, sPreviousHash;
    
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("ListRO", {}, true /*no history*/);
                }
            }

        });
    });
