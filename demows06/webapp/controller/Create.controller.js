sap.ui.define([
    "demows06/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows06.controller.Create", {
            onInit: function () {

            },
            onAddItem: function(){
                var oTable = this.byId("table");
                oTable.addItem(new sap.m.ColumnListItem({cells: [	new sap.m.Input(), 
                                                                    new sap.m.Input(), 
                                                                    new sap.m.Input(), 
                                                                    new sap.m.Input()
                                                                ]
                                                        }));
            },
    
            onToggleDelete: function(oEvent){
    
                var oTable = this.byId("table"),
                oButton = oEvent.getSource();
    
                if(oTable.getMode()===sap.m.ListMode.None){ 
                    oTable.setMode(sap.m.ListMode.Delete);
                    oButton.setText("Disable Delete Mode"); 
                }
                else{
                    oTable.setMode(sap.m.ListMode.None);
                    oButton.setText("Enable Delete Mode"); 
                }
    
            },
    
            onDelete: function(oE){
                var oTable = this.byId("table");
                oTable.removeItem(oE.getParameters().listItem);
            },
    
            onSave: function(){
    
                var oODataModel = this.getView().getModel();
    
                var oData = {
                    "OrderID": this.byId("OrderID").getValue(),
                    "CustomerID":this.byId("CustomerID").getValue(),
                    "EmployeeID":this.byId("EmployeeID").getValue(),
                    "OrderDate":this.byId("OrderDate").getValue(),
                    "RequiredDate":this.byId("RequiredDate").getValue(),
                    "ShippedDate":this.byId("ShippedDate").getValue(),
                    "ShipVia":this.byId("ShipVia").getValue(),
                    "Freight":this.byId("Freight").getValue(),
                    "ShipName":this.byId("ShipName").getValue(),
                    "ShipAddress":this.byId("ShipAddress").getValue(),
                    "Order_Details":[]
                };
    
                var oTable = this.byId("table");
    
                var oListItems = oTable.getItems(); //  Array
    
                oListItems.forEach( (oListItem, iIndex) => {
                    
                    var oCells = oListItem.getCells();
    
                    oData.Order_Details.push({
                        "ProductID":oCells[0].getValue(),
                        "UnitPrice":oCells[1].getValue(),
                        "Quantity":oCells[2].getValue(),
                        "Discount":oCells[3].getValue()
                    });
    
                });
    
                oODataModel.create("/Orders", oData, {
                    success: oRes=>{
                        sap.m.MessageToast.show("Success");
                    },
                    error: oRes=>{
                        sap.m.MessageToast.show("Error");
                    }
                });
    
            },

            onCustomerValueHelp: function(){

                if (!this._CustomerValueHelpDial) {

                    var oCustomerValueHelpFrag = this.loadFragment({
                        name: "demows06.fragment.CustomerValueHelp" 
                    });

                    oCustomerValueHelpFrag.then(function(oDialog) { // return first control
                        this._CustomerValueHelpDial = oDialog;
                        this._CustomerValueHelpDial.open();
                    }.bind(this));

                } 
                else this._CustomerValueHelpDial.open();

            },

            onCloseCustomerVH: function(){
                this._CustomerValueHelpDial.close();
            },

            onCustomerSelectionChange: function(oEvent){
                var selectedItem = oEvent.getParameters().listItem,
                vCustomerId = selectedItem.getBindingContext().getProperty("CustomerID");
                this.byId("CustomerID").setValue(vCustomerId);
                this._CustomerValueHelpDial.close();
            }

        });
    });
