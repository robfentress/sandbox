define(["exports", "./start-lit-element.js"], function (_exports, _startLitElement) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.LazyElement = _exports.$lazyElement = void 0;

  function _templateObject_344660e0289011e9885753df0b16e612() {
    var data = babelHelpers.taggedTemplateLiteral(["\n      <style>\n        :host { display: block; }\n        :host([hidden]) { display: none; }\n      </style>\n      <p>You like pie.</p>\n    "]);

    _templateObject_344660e0289011e9885753df0b16e612 = function _templateObject_344660e0289011e9885753df0b16e612() {
      return data;
    };

    return data;
  }

  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */
  // Import LitElement base class and html helper function
  var LazyElement =
  /*#__PURE__*/
  function (_LitElement) {
    babelHelpers.inherits(LazyElement, _LitElement);

    function LazyElement() {
      babelHelpers.classCallCheck(this, LazyElement);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(LazyElement).apply(this, arguments));
    }

    babelHelpers.createClass(LazyElement, [{
      key: "render",

      /**
       * Define a template for the new element by implementing LitElement's
       * `render` function. `render` must return a lit-html TemplateResult.
       */
      value: function render() {
        return (0, _startLitElement.html)(_templateObject_344660e0289011e9885753df0b16e612());
      }
    }]);
    return LazyElement;
  }(_startLitElement.LitElement); // Register the element with the browser


  _exports.LazyElement = LazyElement;
  customElements.define('lazy-element', LazyElement);
  var lazyElement = {
    LazyElement: LazyElement
  };
  _exports.$lazyElement = lazyElement;
});