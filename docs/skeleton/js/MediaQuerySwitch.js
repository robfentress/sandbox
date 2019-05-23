var MediaQuerySwitch = function (condition, mobile, desktop, switched) {

  this.mql = window.matchMedia(condition);

  this.mobile   = mobile;
  this.desktop   = desktop;
  this.switched = switched;
};

MediaQuerySwitch.prototype.init = function () {
  this.mql.onchange = this.switchContent;
  this.mql.addListener(this.switchContent.bind(this));
  //this.mql.addEventListener('change',      this.switchContent.bind(this));
  if (this.mql.matches) {
    this.mobile.appendChild(this.switched);
  } else {
    this.desktop.appendChild(this.switched);
  }
  this.switched.className = this.switched.className.replace(/\bhidden\b/g, "");
}

MediaQuerySwitch.prototype.switchContent = function(event) {
  if (event.matches) {
    this.mobile.appendChild(this.switched);
  } else {
    this.desktop.appendChild(this.switched);
  }
};
