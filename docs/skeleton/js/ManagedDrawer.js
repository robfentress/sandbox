var ManagedDrawer = function (menuDrawer, modalManager) {

  this.menuButton = menuDrawer.button;
  var controls = menuDrawer.drawer.getAttribute('id');
  this.owner = document.querySelector('[aria-owns="'+controls+'"]');
  this.menuDrawer = menuDrawer.drawer;
  this.modalManager = modalManager;
};

ManagedDrawer.prototype.init = function () {
  this.menuButton.addEventListener('click', this.toggleInert.bind(this));
}

ManagedDrawer.prototype.toggleInert = function(event) {
  if(this.menuButton.getAttribute('aria-expanded') === "true") {
    this.addInert();
  } else {
    this.removeInert();
  }
};

ManagedDrawer.prototype.addInert = function() {
  for (var i=0; i<this.modalManager.nodeList.length; i++) {
    if ((this.modalManager.nodeList[i] !== this.owner) && (this.modalManager.nodeList[i] !== this.menuDrawer)) {
      this.modalManager.nodeList[i].inert = true;
    }
  }
}

ManagedDrawer.prototype.removeInert = function() {
  for (var i=0; i<this.modalManager.nodeList.length; i++) {
    if ((this.modalManager.nodeList[i] !== this.owner) && (this.modalManager.nodeList[i] !== this.menuDrawer)) {
      this.modalManager.nodeList[i].inert = false;
    }
  }
}