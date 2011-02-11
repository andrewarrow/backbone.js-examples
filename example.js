$(function(){

  window.ExampleModel = Backbone.Model.extend({
  });
  
  window.ExampleModelX = new ExampleModel({name: 'x', value: 9});
  window.ExampleModelY = new ExampleModel({name: 'y', value: 3});
    
  window.ExampleVariableView = Backbone.View.extend({

    tagName:  "div",
    template: _.template($('#variable-template').html()),
    
    events: {
      'keyup input':     'valueChange',
      'click .plusButton': 'buttonClick'
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },
    
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },
    
    buttonClick: function() {
      this.model.set({value: parseInt(this.model.get('value'))+1});
    },
    
    valueChange: function() {
      this.model.set({value: $('#'+this.model.get('name')).val()});
    } 
  });
  
  window.ExampleMultiplyView = Backbone.View.extend({

    tagName:  "div",
    template: _.template($('#multiply-template').html()),

    initialize: function() {
      _.bindAll(this, 'render');
      ExampleModelX.bind('change', this.render);
      ExampleModelY.bind('change', this.render);
    },
    
    render: function() {
      $(this.el).html(this.template({x:this.options.x.get('value'), y:this.options.y.get('value')}));
      return this;
    }
    
  });  
  
  window.AppView = Backbone.View.extend({

    el: $("#example"),

    initialize: function() {
      var view = new ExampleVariableView({model: ExampleModelX});
      this.$("#xdiv").append(view.render().el);      

      view = new ExampleVariableView({model: ExampleModelY});
      this.$("#ydiv").append(view.render().el);      
      
      view = new ExampleMultiplyView({x: ExampleModelX, y: ExampleModelY});
      this.$("#multiply").append(view.render().el);
    }
    
  });  
  
  window.App = new AppView;
});