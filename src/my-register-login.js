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

class MyRegisterLogin extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .wrapper-btns {
          margin-top: 15px;
        }
        paper-button.link {
            color: #757575;
        }
      </style>

      <div class="card">
        <div id="unauthenticated">
            <h1>Log In</h1>
        <p><strong>Log in</strong> or <strong>sign up</strong> to access secret Chuck Norris quotes!</p>
        <paper-input-container>
          <label slot="input">Username</label>
          <iron-input slot="input" bind-value="">
            <input id="username" type="text" value="" placeholder="Username">
          </iron-input>
        </paper-input-container>
        <paper-input-container>
          <label>Password</label>
          <iron-input slot="input" bind-value="">
            <input id="password" type="password" value="" placeholder="Password">
          </iron-input>
        </paper-input-container>
        <div class="wrapper-btns">
          <paper-button raised class="primary" on-tap="postLogin">Log In</paper-button>
          <paper-button class="link" on-tap="postRegister">Sign Up</paper-button>
        </div>
      </div>
      <iron-ajax
        id="registerLoginAjax"
        method="post"
        content-type="application/json"
        handle-as="text"
        on-response="handleUserResponse"
        on-error="handleUserError">
      </iron-ajax>
    `;
  }
  static get properties() {
    return {
      formData: {
        type: Object,
        value: {}
      }
    }
  }

  _setReqBody() {
    this.$.registerLoginAjax.body = this.formData;
  }
  
  postLogin() {
    this.$.registerLoginAjax.url = 'http://localhost:3001/sessions/create';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }
  
  postRegister() {
    this.$.registerLoginAjax.url = 'http://localhost:3001/users';
    this._setReqBody();
    this.$.registerLoginAjax.generateRequest();
  }

  handleUserResponse(event) {
    var response = JSON.parse(event.detail.response);
  
    if (response.id_token) {
      this.error = '';
      this.storedUser = {
        name: this.formData.username,
        id_token: response.id_token,
        access_token: response.access_token,
        loggedin: true
      };
    }
  
    // reset form data
    this.formData = {};
  }
  
  handleUserError(event) {
    this.error = event.detail.request.xhr.response;
  }
}

window.customElements.define('my-register-login', MyRegisterLogin);
