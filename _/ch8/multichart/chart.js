dojo.provide("multichart.chart");

dojo.require("dijit._Templated"); 
dojo.require("dijit._Widget"); 

dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.charting.themes.PlotKit.green");

dojo.require("dojox.charting.action2d.Highlight");
dojo.require("dojox.charting.action2d.Magnify");
dojo.require("dojox.charting.action2d.Tooltip");

dojo.require("dojox.charting.widget.Legend");

dojo.require("dojo.colors");
dojo.require("dojo.fx");
dojo.require("dojo.fx.easing");

dojo.declare("multichart.chart", [  dijit._Widget, dijit._Templated ],
{
  templatePath			: dojo.moduleUrl("multichart","templates/chart.html"),
  widgetsInTemplate		: true,
  url                           : "",       // The url to use (on same server) to load json that define data series to plot for this chart
  name                          : "",       // The name
  
  constructor: function()
  {
    console.log("constructor for multichart.chart called");
  },
  
  postCreate: function()
  {
    console.log("postcreate for multichart.chart called. url = "+this.url);
    dojo.xhrGet({   // If you need to load json cross-domain, you can use dojo.io.script.get instead
    url: this.url,
    handleAs: 'json',
    load: dojo.hitch(this, function(result)
    {
      console.log("Drawing chart "+this.name+", result is "+result);  
      var chart1 = new dojox.charting.Chart2D(this.mychart);
      this.chart = chart1;
      chart1.setTheme(dojox.charting.themes.PlotKit.green);
      chart1.addPlot("default", {type: "Default", lines: true, markers: true, tension:2});
      chart1.addAxis("x", {majorTick: {stroke: "black", length: 3}, minorTick: {stroke: "gray", length: 3}});
      chart1.addAxis("y", {vertical: true, majorTick: {stroke: "black", length: 3}, minorTick: {stroke: "gray", length: 3}});
      for(var s in result.series)
      {
        var serie = result.series[s];
        chart1.addSeries(s, serie);
      }
      var anim1a = new dojox.charting.action2d.Magnify(chart1, "default");  // Add magnify animation for datapoints
      var anim1b = new dojox.charting.action2d.Tooltip(chart1, "default");  // Add tooltip action for datapoints      
      chart1.render(); 
      var legend1 = new dojox.charting.widget.Legend({chart: chart1, horizontal: true}, this.mylegend);
    })});  
  }
});
 
