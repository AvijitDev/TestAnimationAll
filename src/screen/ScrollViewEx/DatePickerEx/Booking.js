import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../../../utils/Dimen';
import Modal from 'react-native-modal';
import Colors from '../../../themes/Colors';
import SelectTimeSheet from './SelectTimeSheet';
import moment from 'moment';
import Profile from './Profile';
import DatePicker from 'react-native-date-picker';
import Loader from '../../../utils/Loader';

export default function Booking(props) {
  const [loderVisible, setLoaderVisible] = useState(false);
  const [selectedND, setSelectedND] = useState(new Date());
  const [isPickerV, setIsPickerV] = useState(false);

  const [currentDate, setCurrentDate] = useState(props.date);

  // const [ndate, setNdate] = useState(currentDate);

  const [date, setDate] = useState(moment(currentDate).date());
  const [isyear, setIsyear] = useState(moment(currentDate).year());
  const [ismonth, setIsmonth] = useState(1 + moment(currentDate).month());
  const [PreTotalMonth, setPreTotalMonth] = useState(
    moment(currentDate).daysInMonth(),
  );

  let [arr, setArr] = useState([]);
  let [isdate, setIsDate] = useState(date);

  let m = 10 > ismonth ? '0' + ismonth : ismonth;
  let d = 10 > isdate ? '0' + isdate : isdate;
  let finalDate = isyear + '-' + m + '-' + d;

  var i = 0;
  if (finalDate !== '') {
    for (i; i < PreTotalMonth; i++) {
      arr[i] = {
        selected: i + 1 == isdate ? true : false,
        date: i + 1,
      };
    }
  }

  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();

      let m = 10 > ismonth ? '0' + ismonth : ismonth;
      let dd = 10 > date ? '0' + date : date;
      let d = dd + '/' + m + '/' + isyear;
      props.setDate(d);

      setCurrentDate(new Date());
      let nd = currentDate.toString();
      setDate(moment(nd).date());
      setIsyear(moment(nd).year());
      setIsmonth(1 + moment(nd).month());
      setPreTotalMonth(moment(nd).daysInMonth());
      setIsDate(moment(nd).date());
      setIsPickerV(false);
      setSelectedND(new Date());
    }
  }

  function clickOK() {
    let nd = selectedND;
    setDate(moment(nd).date());
    setIsyear(moment(nd).year());
    setIsmonth(1 + moment(nd).month());
    setPreTotalMonth(moment(nd).daysInMonth());
    setIsDate(moment(nd).date());

    let nn = moment(selectedND).daysInMonth();

    let array = [];
    var j = 0;
    if (finalDate !== '') {
      for (j; j < nn; j++) {
        array[j] = {
          selected: j + 1 == isdate ? true : false,
          date: j + 1,
        };
      }
    }

    setArr(array);
    setLoaderVisible(true);

    setTimeout(() => {
      setLoaderVisible(false);
      setIsPickerV(!isPickerV);
    }, 1500);
  }

  return (
    <SafeAreaView>
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        avoidKeyboard={true}
        style={{
          width: '100%',
          alignSelf: 'center',
          margin: 0,
        }}
        backdropOpacity={0.5}
        animationInTiming={600}
        animationOutTiming={800}
        onBackButtonPress={() => onBackdropPress()}
        onBackdropPress={() => onBackdropPress()}>
        <>
          <Loader visible={loderVisible} />
          <View
            style={[
              styles.viewStyle,
              {
                width: normalize(300),
                height: normalize(310),
              },
            ]}>
            <View style={styles.header}>
              <Text style={styles.txt}>Booking</Text>
            </View>

            <Profile
              width={normalize(280)}
              backgroundColor={Colors.white}
              marginTop={normalize(15)}
              marginBottom={normalize(-5)}
              marginLeft={normalize(15)}
              onPress={() => setIsPickerV(!isPickerV)}
            />

            {!isPickerV ? (
              <SelectTimeSheet date={finalDate} arr={arr} setDate={setIsDate} />
            ) : null}

            {isPickerV ? (
              <>
                <DatePicker
                  date={selectedND}
                  onDateChange={val => {
                    setSelectedND(val);
                  }}
                  // minimumDate={new Date()}
                  androidVariant="iosClone"
                  style={{
                    width: Dimensions.get('screen').width - normalize(55),
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    height: normalize(160),
                  }}
                  textColor={Colors.blue}
                  mode={'date'}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: Colors.aluminium,
                    justifyContent: 'space-between',
                    paddingHorizontal: normalize(30),
                  }}>
                  <TouchableOpacity
                    onPress={() => setIsPickerV(!isPickerV)}
                    style={styles.touch}>
                    <Text style={styles.btxt}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => clickOK()}
                    style={styles.touch}>
                    <Text style={styles.btxt}>OK</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </>
      </Modal>
    </SafeAreaView>
  );
}

Booking.propTypes = {
  dataList: PropTypes.array,
  modalVisible: PropTypes.bool,
  renderData: PropTypes.func,
  onBackdropPress: PropTypes.func,
  backgroundColor: PropTypes.string,
};

Booking.defaultProps = {
  modalVisible: false,
  renderData: null,
  onBackdropPress: null,
  backgroundColor: 'white',
  height: normalize(400),
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: normalize(18),
  },
  header: {
    height: normalize(35),
    width: '100%',
    borderTopLeftRadius: normalize(18),
    borderTopRightRadius: normalize(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.blue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8.35,
    elevation: Platform.OS === 'android' ? 15 : 10,
  },
  txt: {
    fontSize: normalize(14),
    textTransform: 'uppercase',
    fontWeight: '500',
    color: Colors.blue,
  },
  touch: {
    width: normalize(100),
    height: normalize(35),
    backgroundColor: Colors.blue,
    borderRadius: normalize(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btxt: {
    fontSize: normalize(12),
    textTransform: 'uppercase',
    fontWeight: '500',
    color: Colors.white,
  },
});
