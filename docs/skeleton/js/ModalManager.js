var ModalManager = function (nodeList) {

  this.nodeList = nodeList;
  /*this.button   = button;
  this.drawer   = false;

  this.expanded = false;
  this.hiddenClass = "hidden";*/
};

ModalManager.prototype.init = function () {
  /*this.button.addEventListener('click',      this.toggleMenu.bind(this));
  this.drawer =  document.getElementById(this.button.getAttribute('aria-controls'))*/
}

ModalManager.prototype.hideExcept = function(activeList) {

};

/*ModalManager.prototype.toggleMenu = function(event) {
  if (this.expanded) {
    var arr = this.drawer.className.split(" ");
    if (arr.indexOf(this.hiddenClass) == -1) {
      this.drawer.className += " " + this.hiddenClass;
    }
  } else {
    this.drawer.className = this.drawer.className.replace(/\bhidden\b/g, "");
  }
  this.expanded = !this.expanded;
  this.button.setAttribute("aria-expanded", this.expanded);
};*/
