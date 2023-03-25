sap.ui.define([
    "demows11/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows11.controller.Dashboard", {

            onInit: function () {
                this.getRouter().getRoute("DashboardRO").attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function(){

                var oAuthenData = this.getView().getModel("authenModel").getData();

                jQuery.ajax({
                    url:"/vrm/api/dashboard",
                    headers: {
                        "Authorization":"Bearer " + oAuthenData.AccessToken
                    },
                    contentType:"application/json",
                    type:"POST",
                    data: "{}",
                    success: function(oData){
                        
                        var oDashboardModel = new sap.ui.model.json.JSONModel(oData.data);
                        this.getView().setModel(oDashboardModel, "dashboardModel");

                    }.bind(this),
                    error: function(oData){
                    }
                });

            },

            onPressPRTile: function(){
                this.getRouter().navTo("PRListRO", {});
            }

        });
    });
