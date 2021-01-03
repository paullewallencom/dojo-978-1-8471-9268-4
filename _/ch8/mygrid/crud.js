
dojo.provide("mygrid.crud");

dojo.require("dijit.form.TextBox");
dojo.require("dijit._Templated"); 
dojo.require("dijit._Widget"); 
dojo.require("dijit.form.Button");
dojo.require("dijit.form.SimpleTextarea");

dojo.require("dojox.grid.DataGrid");
dojo.require("dijit.Editor");

dojo.require("dojox.data.JsonRestStore");
dojo.require("dojo.data.api.Read");
dojo.require("dojox.rpc.Service");
dojo.require("dojox.rpc.Rest");	

dojo.declare("mygrid.crud", [  dijit._Widget, dijit._Templated ],
{

  store: "",
  layout: "",
  grid: "",
  model: "",
  baseurl: "http://localhost/dojodev/test/store.php/",
  
  templatePath			: dojo.moduleUrl("test.mygrid","templates/crud.html"),
  widgetsInTemplate		: true,
  
  constructor: function()
  {
    console.log("constructor for mygrid.crud called");          
  },
  
  postCreate: function()
  {
          
    var self = this;
    console.log("postcreate for mygrid.crud called. model = "+this.model+", layout = '"+this.layout+"'");
    
    if (!this.store)
    {            
      this.store =  new dojox.data.JsonRestStore({target: this.baseurl+this.model});
      console.log("store created");
    }    
  
    dojo.connect(this.store, "onNew", function(e)
    {
        console.log("onNew event with;");
        console.dir(e);
    });
    
    dojo.connect(this.store, "onSet", function(e)
    {
        console.log("onNew event with;");
        console.dir(e);
    });
    
    var makeitems = function(items, rv)
    {      
      for(var i in items)
      {
        var item = items[i];
        if (item)
        {
          console.log("Adding property "+item.field+" to default item");
          rv[item.field] = "";
        }
      }      
    }    

    var items = eval(this.layout);
    var ii = {};
    if (dojo.isArray(items[0])) // inner array def for folded rows
    {
      for(var i in items)
      {
        var inner = items[i];
        makeitems(inner, ii);
      }
    }
    else
    {      
      makeitems(items, ii); 
    }
    this.defaultitem = ii;
    this.render();
    console.log("postCreate done");
  },

  render: function()
  {
    if (this.grid)
    {
      this.grid.update();
    }
    else
    {
      this.createGrid();
    }
  },

  createGrid: function()
  {
    console.log("creating grid");
    var self = this;
    this.grid = new dojox.grid.DataGrid(
    {
      id: this.id+"_grid",
      store: this.store,
      clientSort: true,
      structure: eval(this.layout)
    }, document.createElement('div'));
  
    dojo.byId(this.id+"_gridContainer").appendChild(this.grid.domNode);
    this.grid.startup();
  
    dojo.connect(
      this.grid,
      "onRowClick",
      function(evt)
      {
        var i = evt.rowIndex;
        console.log("row "+i+" clicked");
        self.row = self.grid.getItem(i);
        self.deletebutton.attr('disabled',false);
      }
    );
    
    dojo.connect(
      this.newbutton,
      "onClick",
      function(evt) 
      {
        self.deletebutton.attr('disabled',true);
        console.log("creating new item locally");
        self.store.newItem(self.defaultitem);
        console.log("Saving state to server");
        self.store.save();
      }     
    );
  
    dojo.connect(
      this.deletebutton,
      "onClick",
      function(evt) 
      {
        console.log("delete button clicked");	
        var item = self.row;
        console.log("item is "+item)
        console.dir(item);
        self.store.deleteItem(item);
        self.store.save();
        self.deletebutton.attr('disabled',true);
      }
    );
  
    dojo.connect(
      this.savebutton,
      "onClick",
      function(evt) 
      {
        console.log("save button clicked deletebutton = "+self.deletebutton+" store = "+self.store);        
        try
        {			
          self.deletebutton.attr('disabled', true);
          self.store.save();
        }
        catch(e)
        {
          console.log("ERROR "+e);
          console.dir(e);
        }              
      }
    );
  }
});
      

 
