import Tts from 'react-native-tts';
import Voice from 'react-native-voice';

Tts.addEventListener('tts-start', () => {});
Tts.addEventListener('tts-finish', () => {});
Tts.addEventListener('tts-cancel', () => {});
Tts.setDefaultRate(0.4);
Tts.setDefaultLanguage('en-US');

export function speak(text) {
  Tts.stop();
  Tts.speak(text, {
    androidParams: {
      KEY_PARAM_PAN: -1,
      KEY_PARAM_VOLUME: 1.0,
      KEY_PARAM_STREAM: 'STREAM_MUSIC',
    },
  });
}

class Listener {
  constructor() {}

  setCallback(callback) {
    // this.callback = callback;
    Voice.onSpeechResults = (results) => {
      callback(results.value[0]);
    };
  }

  start = async () => {
    try {
      await Voice.start('en_US');
      console.log('Started listening');
    } catch (exception) {
      console.error('Listening failed', exception);
    }
  };

  stop = async () => {
    await Voice.stop();
  };
}

export const VoiceListener = new Listener();
