/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../bower_components/iron-ajax/iron-ajax';
import '../bower_components/paper-button/paper-button.js';
import './shared-styles.js';

class MyHomeQuotes extends PolymerElement { 
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
      <iron-ajax
        id="getQuoteAjax"
        auto
        url="http://localhost:3001/api/random-quote"
        method="get"
        handle-as="text"
        debounce-duration="300"
        last-response="{{quote}}">
      </iron-ajax>  
      <div class="card">
        <h1>Quotes</h1>
        <blockquote>[[quote]]</blockquote>
        <paper-button raised on-tap="getQuote" class="primary">Get a New Quote</paper-button>
      </div>
    `;
  }
  getQuote() {
    this.$.getQuoteAjax.generateRequest();
  }
}

window.customElements.define('my-home-quotes', MyHomeQuotes);
