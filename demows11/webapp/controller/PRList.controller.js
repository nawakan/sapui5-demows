sap.ui.define([
    "demows11/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows11.controller.PRList", {
            onInit: function () {
                this.getRouter().getRoute("PRListRO").attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function(){

                var oAuthenData = this.getView().getModel("authenModel").getData(),
                oRequestPRListModel = new sap.ui.model.json.JSONModel("../data/RequestPRList.json");

                oRequestPRListModel.attachRequestCompleted(function(){

                    var requestPRData = oRequestPRListModel.getData();

                    jQuery.ajax({
                        url:"/vrm/api/purchasingRequests",
                        headers: {
                            "Authorization":"Bearer " + oAuthenData.AccessToken
                        },
                        contentType:"application/json",
                        type:"POST",
                        data: JSON.stringify(requestPRData),
                        success: function(oData){

                            var oPRListModel = new sap.ui.model.json.JSONModel(oData.data);
                            this.getView().setModel(oPRListModel, "prListModel");

                        }.bind(this),
                        error: function(oData){
                            debugger;
                        }
                    });

                }.bind(this));

            }
        });
    });
