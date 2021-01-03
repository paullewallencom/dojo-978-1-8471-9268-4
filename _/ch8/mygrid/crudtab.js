
dojo.provide("azillia.crudtab");

dojo.require("dijit.form.TextBox");
dojo.require("dijit._Templated"); 
dojo.require("dijit._Widget"); 
dojo.require("dijit.form.Button");
dojo.require("dijit.form.SimpleTextarea");

dojo.require("dojox.grid.DataGrid");
dojo.require("dijit.Editor");

dojo.require("dojox.grid.cells.dijit");
dojo.require("dijit.layout.ContentPane")
dojo.require("dijit.layout.TabContainer");

dojo.require("dojo.data.api.Read");
dojo.require("dojox.rpc.Service");
dojo.require("dojox.rpc.Rest");		
dojo.require("dojox.data.JsonRestStore");

dojo.require("azillia.crud");

dojo.declare("azillia.crudtab", [  dijit._Widget, dijit._Templated ],
{

  model: "",
  client: "",
  store: "",
  layout: "",
  
  templatePath			: dojo.moduleUrl("azillia","templates/crudtab.html"),
  widgetsInTemplate		: true,
  
  constructor: function()
  {
    console.log("constructor for azillia.crudtab called");          
  }, 

  postCreate: function()
  {
    var self = this;
    self.crud1.render();
    console.log("postcreate for azillia.crudtab called.");
    dojo.connect(this.tab1, "onShow", function(e)
    {
      self.crud1.render();
    });
    dojo.connect(this.tab2, "onShow", function(e)
    {
      self.crud2.render();
    });
  }
});
