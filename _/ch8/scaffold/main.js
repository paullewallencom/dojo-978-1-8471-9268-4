dojo.provide("scaffold.main");

dojo.require("dijit._Templated"); 
dojo.require("dijit._Widget"); 

dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.StackContainer");
dojo.require("dojox.fx");
dojo.require("dojox.fx.easing");

dojo.declare("scaffold.main", [  dijit._Widget, dijit._Templated ],
{
  templatePath			: dojo.moduleUrl("scaffold","templates/main.html"),
  widgetsInTemplate		: true,

  content                       : {}, // name - url pairs for menu building
  
  constructor: function()
  {
    console.log("constructor for scaffold.main called");
  },
  
  postCreate: function()
  {
    console.log("postCreate for scaffold.main called");
    for(var k in this.content)
    {
      var v = this.content[k];
      console.log("Building menu for item "+k+" -> "+v);
      var item = dojo.doc.createElement('span');
      var lastitem = "";
      item.innerHTML = k;
      dojo.addClass(item, "scaffold_menu_item");
      (dojo.hitch(this, function(item, v)  // Create closure to save currently looped item and value (href)
      {
        // Create ContentPane for each url
        var div = dojo.doc.createElement('div');
        dojo.addClass(div, "scaffold_cp");
        console.log("Creating content pane title "+k+" href "+v);
        var cp = new dijit.layout.ContentPane({href: v, preload: true, title: k}, div);
        this.mystack.addChild(cp);
        dojo.connect(item, "onclick", this, function(e)
        {          
          console.log("menu item "+item+" clicked. Stack "+this.mystack+" child "+cp+" selected");
          if (lastitem)
          {
            this.lowlight(lastitem);
          }
          lastitem = item;
          this.mystack.selectChild(cp);
          
        });
        dojo.connect(item, "onmouseover", this, function(e)
        {         
          this.highlight(item);
        });
        dojo.connect(item, "onmouseout", this, function(e)
        {
          if(this.mystack.selectedChildWidget != cp) // Let higlight stand if this contentpane is selected and currently shown
          {            
            this.lowlight(item);
          }
        });        
      }))(item, v);
      this.mymenu.appendChild(item, v);
    }
  },

  highlight: function(item)
  {
    dojo.animateProperty(
    {
            node: item,
            delay: 0,
            duration:400,
            easing:dojo.fx.easing.quartIn,
            properties:{
                    backgroundColor:{ end:"#ffffff" }
            }
    }).play();
  },

  lowlight: function(item)
  {
    dojo.animateProperty(
    {
            node: item,
            delay: 0,
            duration:400,
            easing:dojo.fx.easing.quartOut,
            properties:{
                    backgroundColor:{ end:"#ffcc00" }
            }
    }).play();
  }

});
