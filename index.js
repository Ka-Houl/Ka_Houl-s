;(function(node){
  var Todolist = function(){
  	var _self = this;
  	this.inputshow = false;
  	this.node = node;
    this.edit = null;
  	this.config = this.getConfig();
    this.index = '';
  	this.dconfig = {
			"plusBtn": "",  //添加图标
			"inputArea": "",  //输入展示框
			"addBtn": "",   //增加项目按钮
			"list": "",    //总列表
			"itemClass": ""  //子列项
  	}
  	this.itemClass = this.config.itemClass;

    for(var key in this.dconfig){
    	if(!this.config.hasOwnProperty(key)){
    		console.log(errorInfo(key));
    		return;
    	}
    }
    
    this.setConfig();

    addEvent(this.plusBtn, 'click', function(){
    	_self.showInput();
    });

    addEvent(this.addBtn, 'click', function(){
    	_self.addlist();	
    });

    addEvent(this.olist, 'click', function(e){
      e = e || window.event;
      tar = e.target || e.srcElement;
      _self.listclick(tar);
    })
  }

  Todolist.prototype = {
  	getConfig: function(){
      return JSON.parse(this.node.getAttribute('data-config'));
  	},

  	setConfig: function(){
  		this.plusBtn = this.node.getElementsByClassName(this.config.plusBtn)[0];
  		this.inputArea = this.node.getElementsByClassName(this.config.inputArea)[0];
  		this.addBtn = this.node.getElementsByClassName(this.config.addBtn)[0];
  		this.olist = this.node.getElementsByClassName(this.config.list)[0];
  		this.content = this.node.getElementsByClassName('content')[0];
  	},

  	showInput: function(){
  		if(this.inputshow === false){
  			this.inputArea.style.display = 'block';
  			this.inputshow = true;
  		}
  		else if(this.inputshow === true){
  			this.inputArea.style.display = 'none';
  			this.inputshow = false;
  		}
      this.addBtn.innerText = '增加项目';

  	},
   
    addlist: function(){
    	var content = this.content.value;
    	if(content == ""){
    		return;
    	}
      var pitem = this.olist.getElementsByTagName('p');
      for(var i = 0; i < pitem.length; i++){
      if(pitem[i].innerText == content){
        alert('该项已经存在');
        this.content.value = '';
        this.edit = 'add';
        this.showInput();
        return;        
        }
      }
      if(this.edit == 'edit'){
        // console.log(this.index);
        var pitem = this.olist.getElementsByTagName('p');
        pitem[this.index].innerHTML = this.content.value;
        this.edit = 'add';
        this.showInput();

      }
      else{
        var oli = document.createElement('li');
        oli.className = this.itemClass;
        oli.innerHTML = itemTpl(content);
        this.olist.appendChild(oli);
        this.content.value = '';
        this.showInput();
        this.edit = 'add';
      }
    },

    listclick: function(tar){
      if(tar.className == 'edit-btn fa fa-edit'){
        this.showInput();
        var allchlid = elemChildren(this.olist)
        this.index = Array.prototype.indexOf.call(allchlid, elemParent(tar, 2));
        // console.log(this.index);
        this.addBtn.innerText = '编辑第' + (this.index + 1) + '项';
        for(var j = 0; j < allchlid.length; j++){
          allchlid[j].className = this.itemClass;
        }
        elemParent(tar, 2).className += ' active';
        this.edit = 'edit';
      }
      if(tar.className == 'remove-btn fa fa-times'){
        elemParent(tar,2).remove();
      }
    },
    
  }

	  function itemTpl(text){
	  	return (
	 	 	 '<p class="item-content">' + text + '</p>' + 
	 	 	 '<div class="btn-group">' + 
	 	 	   '<a href="Javascript:;" class="edit-btn fa fa-edit"></a>' + 
         '<a href="Javascript:;" class="remove-btn fa fa-times"></a>' + 
       '</div>'
	 	 	)
	  }

    function errorInfo(key){
      return new Error(
      '你没有配置参数' + key +'\n' +
      '必须配置的参数列表如下:' + '\n' + 
      'plusBtn--添加图标' + '\n' +
      'inputArea--输入展示框' + '\n' + 
      'addBtn--增加项目按钮' + '\n' +
      'list"--总列表' + '\n' +
      'itemClass"--子列项'
      )
    }
	new Todolist();
})(document.getElementsByClassName('wrap')[0]);