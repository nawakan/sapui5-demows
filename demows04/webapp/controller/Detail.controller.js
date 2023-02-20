sap.ui.define([
    "demows04/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows04.controller.Detail", {
            onInit: function () {
                this.getRouter().getRoute("DetailRO").attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function(oEvent){

                var vOrderId = oEvent.getParameters().arguments.orderid
                var oForm = this.byId("SimpleFormDisplay354");
                oForm.bindElement({ path: "/Orders("+vOrderId+")",
                                    events: {
                                                change:function(oEvent){
                                                    if(!oEvent.getSource().getBoundContext()){
                                                        this.getRouter().getTargets().display("NotFoundTG");
                                                    }
                                                }.bind(this)
                                            }
                                });

            }
        });
    });
