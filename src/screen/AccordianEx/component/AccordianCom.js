import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import Icons from '../../../themes/Icons';

export default function AccordianCom(props) {
  // const [expanded, setExpanded] = useState(props.expanded);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  function toggleExpand() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // this.setState({expanded: !this.state.expanded});
    // setExpanded(!expanded);

    const tempFilter = props.arr.map(item => ({
      ...item,
      expanded: false,
    }));
    tempFilter[props.index].expanded = !props.expanded;

    props.setData(tempFilter);
  }

  return (
    <View>
      <TouchableOpacity
        // ref={this.accordian}
        style={styles.row}
        onPress={() => toggleExpand()}>
        <Text style={styles.title}>{props.title}</Text>
        <Image
          source={props.expanded ? Icons.arrow_up : Icons.arrow_down}
          resizeMode={'stretch'}
          style={{
            width: normalize(12),
            height: normalize(12),
          }}
        />
      </TouchableOpacity>
      {!props.expanded ? <View style={styles.parentHr} /> : null}
      {props.expanded ? (
        <View style={styles.child}>
          <Text
            style={{
              fontSize: normalize(12),
              color: Colors.baltic_sea,
            }}>
            {props.data}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: normalize(13),
    fontWeight: 'bold',
    color: Colors.baltic_sea,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: normalize(50),
    paddingLeft: normalize(20),
    paddingRight: normalize(20),
    alignItems: 'center',
    backgroundColor: 'rgba(225,225,225,0.2)',
  },
  parentHr: {
    height: normalize(2),
    color: Colors.white,
    width: '100%',
  },
  child: {
    backgroundColor: Colors.box_color,
    padding: normalize(16),
  },
});
