var Drawer = function (buttons, modalManager) {

  this.button   = buttons.querySelector('button');
  this.opener = buttons.querySelector('[data-toggle="opener"]');
  this.closer = buttons.querySelector('[data-toggle="closer"]');
  this.controls = this.button.getAttribute('aria-controls');
  this.drawer   = document.getElementById(this.controls);
  this.owner = document.querySelector('[data-aria-owns="'+this.controls+'"]');
  this.modalManager = modalManager;
  //this.expanded = false;

  //this.expanded = false;
  this.hiddenClass = "hidden";
};

Drawer.prototype.init = function () {
  //this.expanded = false;
  //console.log(this.getExpanded);
  //this.expanded = this.getExpanded();
  this.button.addEventListener('click', this.toggleMenu.bind(this))
/*  this.opener.addEventListener('click', this.expand.bind(this));
  this.closer.addEventListener('click', this.collapse.bind(this));*/
  /*this.drawer =  document.getElementById(this.opener.getAttribute('aria-controls'));
  this.owner = document.querySelector('[aria-owns="'+controls+'"]');*/
}

Drawer.prototype.toggleMenu = function(event) {
  if (this.expanded()) {
    this.collapse();
  } else {
    this.expand();
  }
  event.stopPropagation();
};

Drawer.prototype.expanded = function () {
  //console.log('getExpanded')
  var arr = this.drawer.className.split(" ");
  //console.log(arr.indexOf(this.hiddenClass));
  return (arr.indexOf(this.hiddenClass) === -1)
}

Drawer.prototype.collapse = function (event) {
  //console.log('clicked ' + this.expanded());
  //if (this.expanded()) {
    this.closer.className += " " + this.hiddenClass;
    this.opener.className = this.closer.className.replace(/\bhidden\b/g, "");
    //this.opener.focus();
    this.drawer.className += " " + this.hiddenClass;
    this.button.setAttribute("aria-expanded", "false");
    /*this.opener.setAttribute("aria-expanded", "false");
    this.closer.setAttribute("aria-expanded", "false");*/
    this.removeInert();
  //}
  //event.stopPropagation();
  /*this.expanded = false;
  this.button.setAttribute("aria-expanded", this.expanded);*/
}

Drawer.prototype.expand = function (event) {
  this.opener.className += " " + this.hiddenClass;
  this.closer.className = this.closer.className.replace(/\bhidden\b/g, "");
  //this.closer.focus();

  this.drawer.className = this.drawer.className.replace(/\bhidden\b/g, "");
  this.button.setAttribute("aria-expanded", "true");
  /*this.opener.setAttribute("aria-expanded", "true");
  this.closer.setAttribute("aria-expanded", "true");*/
  this.addInert();
  //event.stopPropagation();
  /*this.expanded = true;
  this.button.setAttribute("aria-expanded", this.expanded);*/
}


Drawer.prototype.addInert = function() {
  //console.log(this.owner);
  for (var i=0; i<this.modalManager.nodeList.length; i++) {
    if ((this.modalManager.nodeList[i] !== this.owner) && (this.modalManager.nodeList[i] !== this.drawer)) {
      this.modalManager.nodeList[i].inert = true;
    }
  }
}

Drawer.prototype.removeInert = function() {
  for (var i=0; i<this.modalManager.nodeList.length; i++) {
    if ((this.modalManager.nodeList[i] !== this.owner) && (this.modalManager.nodeList[i] !== this.drawer)) {
      this.modalManager.nodeList[i].inert = false;
    }
  }
}