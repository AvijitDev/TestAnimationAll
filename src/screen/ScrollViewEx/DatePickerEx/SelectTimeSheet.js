import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import Button from './Button';
import moment from 'moment';

export default function SelectTimeSheet(props) {

  let DATE = props.date;

  let PreDate = moment(DATE).date();
  let PreMonth = moment(DATE).format('MMM')
  let PreTotalMonth = moment(DATE).daysInMonth();
  let PreYear = moment(DATE).year();
  let PreDay = moment(DATE).format('ddd');
  let PreFDay = moment(DATE).format('dddd');
  
  const [ISscrollref, ISsetScrollRef] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  const [ISfilterData, ISsetFilterData] = useState(props.arr);

  let and = PreDate > 10 ? normalize(61) : normalize(62);
  let plat = Platform.OS == 'android' ? and : normalize(60)
  let len = plat * (PreDate - 3);
  if (PreTotalMonth !== null) {
    try {
      ISscrollref.scrollTo({
        x: len,
        y: 0,
        animated: true,
      });
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  function btnback() {

    if(PreDate !== 1){

      const tempFilter = ISfilterData.map(item => ({
        ...item,
        selected: false,
      }));
      tempFilter[PreDate - 2].selected = true;
      ISsetFilterData(tempFilter);
      props.setDate(tempFilter[PreDate - 2].date);
    }

  }

  function btnnext() {
    let i = (PreDate);
    if(i !== PreTotalMonth){
      const tempFilter = ISfilterData.map(item => ({
        ...item,
        selected: false,
      }));
      tempFilter[i].selected = true;
      ISsetFilterData(tempFilter);
      props.setDate(tempFilter[i].date);
    }
  }

  function btnSelectTime(i) {
    const tempFilter = ISfilterData.map(item => ({
      ...item,
      selected: false,
    }));
    tempFilter[i].selected = true;
    ISsetFilterData(tempFilter);
    props.setDate(tempFilter[i].date);
  }

  let currentTime = PreFDay + ' ' + PreMonth + ' ' + PreDate + ',' + PreYear;

  return (
    <View
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
        justifyContent: props.justifyContent,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginVertical: props.marginVertical,
        marginHorizontal: props.marginHorizontal,
        paddingVertical: props.paddingVertical,
      }}>
      <View
        style={{
          width: '100%',
          height: props.optionsHeight,
          backgroundColor: props.optionsBackgroundColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: props.optionsMarginLeft,
          marginRight: props.optionsMarginRight,
          marginTop: props.optionsMarginTop,
          marginBottom: props.optionsMarginBottom,
          marginVertical: props.optionsMarginVertical,
          marginHorizontal: props.optionsMarginHorizontal,
        }}>
        <Button
          backgroundColor={Colors.hawkes_blue}
          imageUri={'https://cdn-icons-png.flaticon.com/512/271/271220.png'}
          onPress={() => btnback()}
          imgMarginRight={normalize(2)}
          marginHorizontal={normalize(10)}
          tintColor={Colors.blue}
        />

        <Text
          style={{
            fontSize: normalize(12),
            fontWeight: '500',
            color: Colors.blue,
          }}>
          {currentTime}
        </Text>

        <Button
          backgroundColor={Colors.hawkes_blue}
          imageUri={'https://cdn-icons-png.flaticon.com/512/271/271228.png'}
          onPress={() => btnnext()}
          imgMarginLeft={normalize(2)}
          marginHorizontal={normalize(10)}
          tintColor={Colors.blue}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: props.scrollViewBackgroundColor,
          height: props.scrollViewHeight,
          alignItems: 'center',
          marginLeft: props.scrollViewMarginLeft,
          marginRight: props.scrollViewMarginRight,
          marginTop: props.scrollViewMarginTop,
          marginBottom: props.scrollViewMarginBottom,
          marginVertical: props.scrollViewMarginVertical,
          marginHorizontal: props.scrollViewMarginHorizontal,
        }}
        ref={ref => {
          ISsetScrollRef(ref);
        }}>
        {ISfilterData &&
          ISfilterData?.map((item, i) => (
            <TouchableOpacity
              key={i}
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                dataSource[i] = layout.y;
                setDataSource(dataSource);
              }}
              style={[
                styles.touchable,
                {
                  borderColor: item.selected ? Colors.blue : Colors.white,
                },
              ]}
              onPress={() => {
                btnSelectTime(i);
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  textAlign: 'center',
                  color: item.selected ? Colors.black : Colors.rock_blue,
                }}>
                {item.date.toString().length == 1 ? '0' + item.date : item.date}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <Text
        style={{
          width: '100%',
          height: normalize(15),
          textAlign: 'center',
          fontSize: normalize(11),
          marginTop: normalize(10),
        }}>
        {PreDay}
      </Text>
    </View>
  );
}

SelectTimeSheet.propTypes = {
  width: PropTypes.any,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  justifyContent: PropTypes.string,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginVertical: PropTypes.number,
  marginHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,

  optionsHeight: PropTypes.number,
  optionsBackgroundColor: PropTypes.string,
  optionsMarginLeft: PropTypes.number,
  optionsMarginRight: PropTypes.number,
  optionsMarginTop: PropTypes.number,
  optionsMarginBottom: PropTypes.number,
  optionsMarginVertical: PropTypes.number,
  optionsMarginHorizontal: PropTypes.number,

  scrollViewHeight: PropTypes.number,
  scrollViewMarginLeft: PropTypes.number,
  scrollViewMarginRight: PropTypes.number,
  scrollViewMarginTop: PropTypes.number,
  scrollViewMarginBottom: PropTypes.number,
  scrollViewMarginVertical: PropTypes.number,
  scrollViewMarginHorizontal: PropTypes.number,
  scrollViewBackgroundColor: PropTypes.string,
};

SelectTimeSheet.defaultProps = {
  width: normalize(300),
  height: normalize(150),
  backgroundColor: Colors.white,
  marginVertical: normalize(20),
  justifyContent: 'center',
  optionsHeight: normalize(40),
  optionsBackgroundColor: Colors.hawkes_blue,
  optionsMarginBottom: normalize(5),
  paddingVertical: normalize(10),
  scrollViewHeight: normalize(45),
  scrollViewMarginVertical: normalize(5),
  scrollViewBackgroundColor: Colors.white,
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: normalize(60),
    borderWidth: normalize(1.5),
    marginHorizontal: normalize(15),
    width: normalize(30),
    height: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
