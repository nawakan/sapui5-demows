sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("demows08.controller.View1", {

            onInit: function () {

            },

            onAdd: function(){

                var vValue01 = this.byId("value01").getValue(),
                vValue02 = this.byId("value02").getValue();

                var oRequestXML = new sap.ui.model.xml.XMLModel("../requestXML/addMethod.xml");
                oRequestXML.attachRequestCompleted(function(){
                    
                    oRequestXML.setProperty("/soapenv:Body/tem:Add/tem:intA", vValue01);
                    oRequestXML.setProperty("/soapenv:Body/tem:Add/tem:intB", vValue02);

                    this._postSOAP("/dne/calculator.asmx", 
                    oRequestXML.getXML(),
                    function(oData){
                        var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
                        this.getView().setModel(oXMLModel, "addResult");
                    }.bind(this));

                }.bind(this));

            },

            onFind: function(){

                var vFindName = this.byId("findname").getValue();

                this._postSOAP("/csp/samples/SOAP.Demo.cls?soap_method=GetListByName&name="+
                vFindName, "",
                function(oData){
                    var oXMLModel = new sap.ui.model.xml.XMLModel(oData);
                    this.getView().setModel(oXMLModel, "listName");
                }.bind(this));

            },

            _postSOAP: function(sURL, oData, fnSuccess, fnError){
                
                jQuery.ajax({
                    url:sURL,
                    headers: {
                        "Content-Type":"text/xml"
                    },
                    dataType:"xml",
                    type:"POST",
                    data: oData,
                    success: function(oData){
                        fnSuccess(oData);
                    },
                    error: function(oData){
                        fnError(oData);
                    }
                });

            }

        });
    });
