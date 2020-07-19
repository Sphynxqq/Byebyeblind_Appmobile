import Tts from 'react-native-tts';

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
