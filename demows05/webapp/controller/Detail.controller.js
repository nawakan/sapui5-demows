sap.ui.define([
    "demows05/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows05.controller.Detail", {
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

                var oTable = this.byId("table");
                oTable.bindItems({
                    path : "/Order_Details",
                    filters: [ new sap.ui.model.Filter({
                        path: "OrderID",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: vOrderId
                    }) ],
                    template : new sap.m.ColumnListItem({cells: [	new sap.m.Text({	
                                                                        text:"{ProductID}" }), 
                                                                    new sap.m.Text({	
                                                                            text:"{UnitPrice}" }), 
                                                                    new sap.m.ObjectNumber({	
                                                                        number:"{Quantity}" }), 
                                                                    new sap.m.ObjectNumber({	
                                                                        number:"{Discount}" })
                                                                ]
                                                        })
                });

            }
        });
    });
