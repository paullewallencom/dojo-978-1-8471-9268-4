dojo.provide("scaffold.menu");

dojo.require("dijit._Templated"); 
dojo.require("dijit._Widget"); 


dojo.declare("scaffold.menu", [  dijit._Widget, dijit._Templated ],
{
  templatePath			: dojo.moduleUrl("scaffold","templates/menu.html"),
  widgetsInTemplate		: true,
  
  constructor: function()
  {
    console.log("constructor for scaffold.menu called");
  },
  
  postCreate: function()
  {
           
  }

});
 
