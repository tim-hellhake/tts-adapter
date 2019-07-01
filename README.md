# Text-to-Speech Adapter

[![Build Status](https://travis-ci.org/tim-hellhake/tts-adapter.svg?branch=master)](https://travis-ci.org/tim-hellhake/tts-adapter)
[![dependencies](https://david-dm.org/tim-hellhake/tts-adapter.svg)](https://david-dm.org/tim-hellhake/tts-adapter)
[![devDependencies](https://david-dm.org/tim-hellhake/tts-adapter/dev-status.svg)](https://david-dm.org/tim-hellhake/tts-adapter?type=dev)
[![optionalDependencies](https://david-dm.org/tim-hellhake/tts-adapter/optional-status.svg)](https://david-dm.org/tim-hellhake/tts-adapter?type=optional)
[![license](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](LICENSE)

Reads texts for you.

## Usage
The addon registers a tts device with a `speak(text)` action.

Currently, a rule can only trigger parameterless actions.

To read a text from a rule, you have to register an action with a predefined message.

Go to the settings of the addon and add a rule with a name and a message of your choice.

The tts device now provides a new action with the specified name you can use in a rule.

## Raspberry Pi Setup

To run this add-on on a Raspberry Pi, run the following command to install a
local text-to-speech engine:

```bash
sudo apt-get install festival festvox-kallpc16k
```
