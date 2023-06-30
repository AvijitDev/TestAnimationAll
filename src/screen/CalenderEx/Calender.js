import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import normalize from '../../utils/Dimen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from 'moment';

export default function Calender() {

  const unique = [
    {
      d: '12-03-2022',
    },
    {
      d: '18-03-2022',
    },
    {
      d: '22-03-2022',
    },
    {
      d: '26-03-2022',
    },
    {
      d: '28-03-2022',
    },
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Initialize a State
  const [activeDate, setActiveDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(activeDate.getDate());
  const [currentMonth, setCurrentMonth] = useState(activeDate.getMonth());
  const [currentYear, setCurrentYear] = useState(activeDate.getFullYear());

  // Generating a Matrix
  function generateMatrix() {
    var matrix = [];
    // Create header
    matrix[0] = weekDays;

    // More code here

    var year = currentYear;
    var month = currentMonth;

    var firstDay = new Date(year, month, 1).getDay();

    var maxDays = nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  }

  // ----------------------------------------------------------

  function dataExist(date) {
    let m = currentMonth + 1;
    let nd1 = m.toString().length == 1 ? '0' + m : m;
    let d = date + '-' + nd1 + '-' + currentYear;

    if (unique.some(data => data.d === d)) {
      return true;
    } else {
      return false;
    }
  }

  // Rendering a Month

  var matrix = generateMatrix();

  var rows = [];
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <TouchableOpacity
          disabled={rowIndex == 0 ? true : false}
          onPress={() => onPressSelectedDate(item)}
          style={{
            // flex: normalize(60),
            width: rowIndex == 0 ? normalize(35) : normalize(25),
            height: normalize(25),
            backgroundColor: item == currentDate ? '#247319' : null,
            margin: normalize(3),
            justifyContent: 'center',
            borderRadius: normalize(30),
            borderColor: dataExist(item) ? '#247319' : 'white',
            borderWidth: dataExist(item) ? normalize(1) : 0
          }}>
          <Text
            style={{
              textAlign: 'center',
              // Highlight header
              // backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
              // Highlight Sundays
              // color: colIndex == 0 ? '#a00' : '#000',

              // Highlight selected date
              color:
                rowIndex == 0
                  ? '#247319'
                  : item == currentDate
                  ? '#fff'
                  : '#000',
              // Highlight current date
              fontWeight: item == currentDate ? 'bold' : '',
            }}>
            {/* {item} */}
            {item != -1 ? item : ''}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <View
        style={{
          //   flex: 1,
          height: normalize(30),
          width: '100%',
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {rowItems}
      </View>
    );
  });

  function onPressSelectedDate(d) {
    if (!d.match && d != -1) {
      setCurrentDate(d);
    }
  }

  function onPreviousMonth() {
    if (currentMonth == 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function onNextMonth() {
    if (currentMonth == 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      // console.log('Year :: ',currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  const [backgroundColor, setBackgroundColor] = useState('#2c8c1f');

  function onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;

    switch (gestureName) {
      case SWIPE_LEFT:
        setBackgroundColor('#e624ed');
        break;
      case SWIPE_RIGHT:
        setBackgroundColor('#3764ed');
        break;
    }
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        marginTop: normalize(80),
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center',
          marginBottom: normalize(30),
        }}>
        {currentMonth == 1
          ? currentDate > 28
            ? ''
            : currentDate
          : currentDate}{' '}
        &nbsp;
        {months[currentMonth]} &nbsp;
        {currentYear}
      </Text>
      <View
        style={{
          width: '100%',
          paddingHorizontal: normalize(10),
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: normalize(100),
            height: normalize(35),
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(8),
          }}
          onPress={() => onPreviousMonth()}>
          <Text
            style={{
              color: '#fff',
              fontSize: normalize(14),
              textTransform: 'uppercase',
              fontWeight: '500',
            }}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: normalize(100),
            height: normalize(35),
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(8),
          }}
          onPress={() => onNextMonth()}>
          <Text
            style={{
              color: '#fff',
              fontSize: normalize(14),
              textTransform: 'uppercase',
              fontWeight: '500',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        onSwipeLeft={() => onNextMonth()}
        onSwipeRight={() => onPreviousMonth()}
        config={config}
        style={
          {
            //   flex: 1,
            //   backgroundColor: 'red'
          }
        }>
        <View
          style={{
            borderColor:
              activeDate.getMonth() == currentMonth
                ? '#2c8c1f'
                : backgroundColor,
            borderWidth: normalize(1),
            paddingTop: normalize(10),
            margin: normalize(15),
            borderRadius: normalize(10),
          }}>
          {rows}
        </View>
      </GestureRecognizer>
    </View>
  );
}