sap.ui.define([
    "demows11/controller/BaseController",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("demows11.controller.Login", {
            onInit: function () {

            },
            onLogin: function(){

                var oAuthenData = this.getView().getModel("authenModel").getData();

                var formData = new FormData();

                formData.append("grant_type", oAuthenData.GetToken.grant_type);
                formData.append("client_id", oAuthenData.GetToken.client_id);
                formData.append("username", this.byId("user").getValue());
                formData.append("password", this.byId("password").getValue());

                jQuery.ajax({
                    url:"/vrm/oauth/token",
                    headers: {
                        "Authorization":"Basic " + 
                        btoa(oAuthenData.GetToken.User+":"+oAuthenData.GetToken.Password)
                    },
                    contentType: false,
                    processData: false,
                    type:"POST",
                    data: formData,
                    success: function(oData){

                        var oAuthenModel = this.getView().getModel("authenModel"),
                        oAuthenData = oAuthenModel.getData();

                        oAuthenData.AccessToken = oData.access_token;
                        oAuthenModel.setData(oAuthenData);

                        this.getRouter().navTo("DashboardRO", {});

                    }.bind(this),
                    error: function(oData){
                        MessageBox.error("Authentication failed");
                    }
                });

            }
        });
    });
