sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows07.controller.View1", {

            onInit: function () {

                var oJsonModel = new sap.ui.model.json.JSONModel("/public/v2/users");
                this.getView().setModel(oJsonModel, "rest_api");

            },

            onSave: function(){

                jQuery.ajax({
                    url:"/public/v2/users",
                    data:{
                        "name":this.byId("name").getValue(),
                        "gender":this.byId("gender").getValue(),
                        "email":this.byId("email").getValue(),
                        "status":this.byId("status").getValue(),
                    },
                    dataType:"json",
                    type:"POST",
                    headers:{
                        "Authorization":"Bearer 810bcabb44e31a13b754d853d6cb3cf798d73dbc1aa5b6b35027365511ab8ad4"
                    },
                    success: function(oData){
                        sap.m.MessageBox.success(oData.id+" has been created.");
                    },
                    error: function(oData){
                        sap.m.MessageBox.error(JSON.stringify(oData.responseJSON, null, 2));
                    }
                });


                

            }

        });
    });
