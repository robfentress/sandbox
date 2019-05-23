import { LitElement, html } from 'lit-element';

class CtaLink extends LitElement {
  static get properties() {
    return {
      linkURL: { type: String, reflect: true },
      alignment: { type: String, reflect: true }
    };
  }

  constructor() {
    super();

    // Initialize properties
    this.linkURL = "#";
  }

  render() {
    const { linkURL } = this;
    return html`
      <style>
        /*:host { display: block; }
        :host([hidden]) { display: none; }*/
    :host > span {
        display: -webkit-box!important;
        display: -ms-flexbox!important;
        display: flex!important;
    }
    :host([alignment='justify-content-center']) > span {
        justify-content: center;
    }
    :host([alignment='justify-content-end']) > span {
        justify-content: flex-end;
    }
    :host > span > a {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        border: 2px solid transparent;
        letter-spacing: .25rem;
        padding: .875rem 4.375rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0;
        -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
        font-family: gineso-condensed,sans-serif;
        text-decoration: none;
    }
    :host {
        --light: rgba(255, 255, 255, 1);
        --maroon: rgba(134, 31, 65, 1);
        --dark: rgba(0, 0, 0, 1);
        --orange: #C64600;
    }
    
    /* MAROON */
    :host > span > a, :host([colorChoice="maroon"]) > span > a {
        background-color: var(--maroon);
        border-color: var(--maroon);
        -webkit-box-shadow: none;
        box-shadow: none;
        color: var(--light, #fff);
    }
    :host > span > a:hover, :host([colorChoice="maroon"]) > span > a:hover {
        color: var(--light);
        background-color: #a52650;
        border-color: #a52650;
    }
    :host([linkPresentation="outline"]) > span > a, :host([colorChoice="maroon"][linkPresentation="outline"]) > span > a {
        color: var(--maroon);
        border: 1px solid var(--maroon);
        background: var(--light);
    }
    :host([linkPresentation="outline"]) > span > a:hover, :host([colorChoice="maroon"][linkPresentation="outline"]) > span > a:hover {
        color: #fff;
        background-color: var(--maroon);
        border-color: var(--maroon);
    }
    
    /* ORANGE */
    :host([colorChoice="orange"]) > span > a {
        background-color: var(--orange);
        border-color: var(--orange);
        -webkit-box-shadow: none;
        box-shadow: none;
        /*color: var(--light);*/
        color: var(--orange);
    }
    :host([colorChoice="orange"]) > span > a:hover {
        color: var(--light);
        background-color: #d04a00;
        border-color: #d04a00;
    }
    :host([colorChoice="orange"][linkPresentation="outline"]) > span > a {
        color: var(--orange);
        background: var(--light);
        border-color: var(--orange);
    }
    :host([colorChoice="orange"][linkPresentation="outline"]) > span > a:hover {
        color: #fff;
        background-color: var(--orange);
        border-color: var(--orange);
    }
    
    /* DARK */
    :host([colorChoice="dark"]) > span > a {
        background-color: var(--dark);
        border-color: var(--dark);
        -webkit-box-shadow: none;
        box-shadow: none;
        color: var(--light);
    }
    :host([colorChoice="dark"]) > span > a:hover {
        color: var(--light);
        background-color: #131313;
        border-color: #131313;
    }
    :host([colorChoice="dark"][linkPresentation="outline"]) > span > a {
        color: var(--dark);
        background: var(--light);
        border-color: var(--dark);
    }
    :host([colorChoice="dark"][linkPresentation="outline"]) > span > a:hover {
        color: #fff;
        background-color: var(--dark);
        border-color: var(--dark);
    }
    
    /* LIGHT */
    :host([colorChoice="light"]) > span > a {
        background-color: var(--light);
        border-color: #e5e1e6;
        -webkit-box-shadow: none;
        box-shadow: none;
        color: #861f41;
    }
    :host([colorChoice="light"]) > span > a:hover {
        color: #212529;
        background-color: var(--light);
        border-color: #eae7eb;
    }
    :host([colorChoice="light"][linkPresentation="outline"]) > span > a {
        color: var(--light, #FFF);
        background: var(--dark);
        border-color: var(--light);
    }
    :host([colorChoice="light"][linkPresentation="outline"]) > span > a:hover {
        color: var(--light);
        background-color: rgba(85, 85, 85, 1);
        border-color: var(--light);
    }
    
    :host([shadow]) > span > a {
        -webkit-box-shadow: 0 0 10px rgba(102,102,102,.7);
        box-shadow: 0 0 10px rgba(102,102,102,.7);
    }
    
    :host([fontFamily="gineso"]) > span > a {
        font-family: gineso-condensed,sans-serif;
    }
    :host([fontFamily="acherus"]) > span > a {
        font-family: font-family: Acherus,sans-serif;
    }
    :host([fontFamily="crimson"]) > span > a {
        font-family: crimsontext,serif;
    }
    :host([uppercase]) > span > a {
        text-transform: uppercase;
    }
    :host([opacity="60"]) > span > a {
        opacity: .6;
    }
    :host([opacity="70"]) > span > a {
        opacity: .7;
    }
    :host([opacity="80"]) > span > a {
        opacity: .8;
    }
    :host([opacity="90"]) > span > a {
        opacity: .9;
    }
    :host([fullWidth]) > span > a {
        width: 100%;
    padding-left: 0.5em;
    padding-right: 0.5em;
    }
    
    a:focus {
        outline-color: #75787b;
        outline-offset: 3px;
        outline-style: dashed;
        outline-width: 2px;
    }
      </style>
      <span><a href="${linkURL}"><slot>Call to Action - Link</slot></a></span>
		`;
  }
}

customElements.define('cta-link', CtaLink);
