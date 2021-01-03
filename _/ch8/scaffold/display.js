dojo.provide("scaffold.display");

dojo.require("dijit._Templated"); 
dojo.require("dijit._Widget"); 


dojo.declare("scaffold.display", [  dijit._Widget, dijit._Templated ],
{
  templatePath			: dojo.moduleUrl("scaffold","templates/display.html"),
  widgetsInTemplate		: true,
  
  constructor: function()
  {
    console.log("constructor for scaffold.display called");          
  },
  
  postCreate: function()
  {
           
  }

});
 
