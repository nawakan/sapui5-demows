sap.ui.define([
    "demows09/controller/Create.controller",
    "demows09/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter) {
        "use strict";

        return Controller.extend("demows09.controller.Edit", {

            formatter: Formatter,

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
                this.byId("OrderDate").bindValue({
                    path:"OrderDate",
                    formatter: this.formatter.formatDate
                });
                this.byId("RequiredDate").bindValue({
                    path:"RequiredDate",
                    formatter: this.formatter.formatDate
                });
                this.byId("ShippedDate").bindValue({
                    path:"ShippedDate",
                    formatter: this.formatter.formatDate
                });
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
