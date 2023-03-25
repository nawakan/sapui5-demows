sap.ui.define([
    "demows09/controller/BaseController",
    "demows09/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Formatter) {
        "use strict";

        return Controller.extend("demows09.controller.Detail", {

            formatter: Formatter,
            
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
                
            },

            onEdit: function(){
                var oForm = this.byId("SimpleFormDisplay354"),
                vOrderId = oForm.getBindingContext().getProperty("OrderID");
                this.getRouter().navTo("EditRO", { orderid: vOrderId });
            },

            onSign: function(){

                if (!this._SignPadDialog) {

                    var oSignPadFrag = this.loadFragment({
                        name: "demows09.fragment.SignPadDialog" 
                    });

                    oSignPadFrag.then(function(oDialog) { // return first control
                        this._SignPadDialog = oDialog;
                        this._SignPadDialog.open();
                    }.bind(this));

                } 
                else this._SignPadDialog.open();

            },

            onSaveSignPad: function(){
                var link = document.createElement('a');
                link.href = sap.ui.core.Fragment.byId("fr1", "signature_pad").getImageURL();
                link.download = 'sign.jpeg';
                link.click(); 	
            },
    
            onClearSignPad: function(oEvent) {
                this.byId("signaturepad").clearSignature();
            },

            onCloseSignPad: function(){
                this._SignPadDialog.close();
            }

        });
    });
