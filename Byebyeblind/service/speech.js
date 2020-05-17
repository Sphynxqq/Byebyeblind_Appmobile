import Tts from 'react-native-tts';

export function speak(text) {
  Tts.speak(text, {
    androidParams: {
      KEY_PARAM_PAN: -1,
      KEY_PARAM_VOLUME: 1.0,
      KEY_PARAM_STREAM: 'STREAM_MUSIC',
    },
  });
}
