dojo.provide("multichart.main");

dojo.require("dijit._Templated"); 
dojo.require("dijit._Widget"); 

dojo.require("dijit.layout.ContentPane");
dojo.require("dojox.layout.GridContainer");

dojo.require("multichart.chart");

dojo.declare("multichart.main", [  dijit._Widget, dijit._Templated ],
{
  templatePath			: dojo.moduleUrl("multichart","templates/main.html"),
  widgetsInTemplate		: true,

  content                       : {}, // name - url pairs to make draggable charts out of. Must be passed from calling script / page
  columns                       : 3,  // How many columns we want to have in the GridContainer
  
  constructor: function()
  {
    console.log("constructor for multichart.main called");
  },
  
  postCreate: function()
  {
    console.log("postCreate for multichart.main called mycontainer is "+this.test);
    this.gc = new dojox.layout.GridContainer(
      {
        nbZones: this.columns,
        opacity: 0.7,           // For avatars of dragged components
        allowAutoScroll: true, 
        hasResizableColumns: false,
        isAutoOrganized : true,
        withHandles: true,
        acceptTypes: ["multichart.chart"]  // This property must always be present, and can take any kind of widget, including your own
      }, this.test);
    this.gc.startup(); // When creating some dojox widgets programmtaically, you must manually call the startup() function, to make sure it's properly intialized
    var i = 0; // Count for which column we'll place each chart in
    var p = 0; // Count for which row we'll place a chart in
    for(var name in this.content)
    {
      var url = this.content[name]; 
      var chart = new multichart.chart({name: name, url:url});  // Create a custom chart with the given name and url
      console.log("adding chart "+chart+" to zone "+i+", place "+p);
      this.gc.addService(chart, i, p); // Add the chart to the GridContainer (This function will be called addChild in the future, for conformance with similar containers.
      i++;
      if (i > this.columns-1)  // Go to next row if we've hit the end of the columns
      {
        i = 0;
        p++;
      }
    }    
  }

});
