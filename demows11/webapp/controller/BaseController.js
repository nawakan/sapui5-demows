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

        return Controller.extend("demows11.controller.BaseController", {
            
            getRouter: function(){
                return UIComponent.getRouterFor(this);
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
            },

            postAjax: function(sURL, oHeaders, oBody,
                fnSuccess, fnError){

                jQuery.ajax({
                    url:sURL,
                    headers: oHeaders,
                    // dataType:"json",
                    contentType: false,
                    processData: false,
                    type:"POST",
                    data: oBody,
                    success: function(oData){
                        fnSuccess(oData);
                    },
                    error: function(oData){
                        fnError(oData);
                    }
                });

            }

        });
    });
