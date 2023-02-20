sap.ui.define([
    "demows06/controller/Create.controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows06.controller.Edit", {

            onInit: function () {
                this.getRouter().getRoute("EditRO").attachPatternMatched(this._onPatternMatched, this);
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

                this.byId("OrderID").bindValue("OrderID");
                this.byId("CustomerID").bindValue("CustomerID");
                this.byId("EmployeeID").bindValue("EmployeeID");
                this.byId("OrderDate").bindValue("OrderDate");
                this.byId("RequiredDate").bindValue("RequiredDate");
                this.byId("ShippedDate").bindValue("ShippedDate");
                this.byId("ShipVia").bindValue("ShipVia");
                this.byId("Freight").bindValue("Freight");
                this.byId("ShipName").bindValue("ShipName");
                this.byId("ShipAddress").bindValue("ShipAddress");
                
                var oTable = this.byId("table");

                oTable.bindItems({
                    path : "/Order_Details",
                    filters: [ new sap.ui.model.Filter({
                        path: "OrderID",
                        operator: sap.ui.model.FilterOperator.EQ,
                        value1: vOrderId
                    }) ],
                    template : new sap.m.ColumnListItem({cells: [	new sap.m.Input({	
                                                                        value:"{ProductID}" }), 
                                                                    new sap.m.Input({	
                                                                        value:"{UnitPrice}" }), 
                                                                    new sap.m.Input({	
                                                                        value:"{Quantity}" }), 
                                                                    new sap.m.Input({	
                                                                        value:"{Discount}" })
                                                                ]
                                                        })
                });

            }

        });
    });
