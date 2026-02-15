"use strict";

const DOMelement = function (selector, height, width, bg, fontSize) {
  ((this.selector = selector),
    (this.height = height),
    (this.width = width),
    (this.bg = bg),
    (this.fontSize = fontSize),
    (this.createElement = function () {
      let element;

      if (this.selector[0] === ".") {
        element = document.createElement("div");
        element.className = this.selector.slice(1);
      } else if (this.selector[0] === "#") {
        element = document.createElement("p");
        element.id = this.selector.slice(1);
      }

      element.textContent = "I am an example";

      element.style.cssText = `
        height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        font-size: ${this.fontSize};
    `;

    document.body.append(element);
    }));
};

const exampleEl = new DOMelement('.text', 100, 300, 'hotpink', '20px');
exampleEl.createElement();