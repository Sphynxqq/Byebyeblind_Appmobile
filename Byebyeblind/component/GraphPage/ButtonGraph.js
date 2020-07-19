import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {speak} from '../../service/speech';
import { checkFav, addFav, delFav } from '../../service/favorite';

export const ButtonGraph = (props) => {
  // Voice.onSpeechResults = (res) => {
  //   const key = res.value[0];
  //   speak(res.value[0] + ' Confirm');
  //   Alert.alert(
  //     'ยืนยัน',
  //     res.value[0],
  //     [
  //       {
  //         text: 'ยกเลิก',
  //         onPress: () => {
  //           return null;
  //         },
  //       },
  //       {
  //         text: 'ตกลง',
  //         onPress: async () => {
  //           console.log("logtestttttttt");
  //           console.log("key : " + res.value[0]);
  //           if (key !== 'favorite') {
  //             isSymbolExist(res.value[0]).then((exist) => {
  //               if (exist) {
  //                 console.log("change : " + res.value[0]);
  //                 this.props.triggerGraphUpdate(res.value[0]);
  //               } else {
  //                 speak('Symbol does not exist');
  //               }
  //             });
  //           } else {
  //             this.props.navigation.navigate('Favorite', '01');
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false },
  //   );
  // };
  return (
    <SafeAreaView style={styles.buttonGraph}>
      <TouchableOpacity
        onPress={() => {
          speak('Voice');
          // Voice.start('en-US');
        }}
        style={styles.bigBtn}>
        <Image
          style={styles.sizeImgbtn}
          source={require('../../assets/microphone.png')}
        />
        <Text style={styles.btnfont}>Voice</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          speak('Previous');
          props.previous();
        }}>
        <View style={styles.setbtnleftandright}>
          <Image
            style={styles.sizeImgbtn}
            source={require('../../assets/left.png')}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          speak('Next');
          props.next();
        }}>
        <View style={styles.setbtnleftandright}>
          <Image
            style={styles.sizeImgbtn}
            source={require('../../assets/right.png')}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          speak('Favorite');
          checkFav('01', 'AP').then((exist) => {
            // console.log(exist);
            if (exist) {
              console.log("have")
              delFav('01', '7UP')
            } else {
              console.log("dont have")
              addFav('01', 'AP')
            }
          });
        }}>
        <View style={styles.bigBtn}>
          <Image
            style={styles.sizeImgbtn}
            source={require('../../assets/star.png')}
          />
          <Text style={styles.btnfont}>Favorite</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonGraph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  sizeImgbtn: {
    width: 45,
    height: 45,
  },
  btnfont: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  bigBtn: {
    height: 65,
    padding: 8,
    backgroundColor: '#FBD1A7',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setbtnleftandright: {
    width: 65,
    height: 65,
    backgroundColor: '#FBD1A7',
    borderRadius: 35,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ButtonGraph.propsTypes = {
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
