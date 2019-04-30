/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

const say = require('say');

const {
  Adapter,
  Device,
} = require('gateway-addon');

class TtsDevice extends Device {
  constructor(adapter, config) {
    super(adapter, TtsDevice.name);
    this['@context'] = 'https://iot.mozilla.org/schemas/';
    this.title = this.id;
    this.description = 'Speaks to you';
    this.config = config;

    const speakInput = {
      type: 'object',
      properties: {
        text: {
          type: 'string'
        }
      }
    };

    this.addSpeakAction('speak', speakInput);

    this.messages = {};

    if (config.messages) {
      for (const message of config.messages) {
        this.messages[message.name] = message.message;
        console.log(`Creating action for ${message.name}`);
        this.addSpeakAction(message.name);
      }
    }
  }

  addSpeakAction(name, input) {
    const description = {
      title: name,
      description: 'Read some text',
    };

    if (input) {
      description.input = input;
    }

    this.addAction(name, description);
  }

  async performAction(action) {
    action.start();

    if (action.name === 'speak') {
      console.log(`Speaking ${action.input.text}`);
      say.speak(action.input.text);
    } else {
      const message = this.messages[action.name];

      if (message) {
        console.log(`Speaking ${message}`);
        say.speak(message);
      } else {
        console.warn(`Unknown action ${action}`);
      }
    }

    action.finish();
  }
}

class TtsAdapter extends Adapter {
  constructor(addonManager, manifest) {
    super(addonManager, TtsAdapter.name, manifest.name);
    addonManager.addAdapter(this);
    const device = new TtsDevice(this, manifest.moziot.config);
    this.handleDeviceAdded(device);
  }
}

module.exports = TtsAdapter;
