import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TextInput,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";
import normalize from "../../../utils/Dimen";
import Modal from "react-native-modal";
import Colors from "../../../themes/Colors";
// import Fonts from "../../../themes/Fonts";
import Icons from "../../../themes/Icons";
import _ from "lodash";

export default function CountryPicker(props) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(props.data);

  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  }

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.setData(item.phone);
          onBackdropPress();
        }}
        style={styles.touch2}
      >
        <Text style={styles.txt1}>{item.phone}</Text>
        <View style={styles.vvv}>
          <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt2}>{item.name}</Text>
          <Image
          source={item.icon}
          style={{
            height: normalize(12),
            width: normalize(18),
            marginLeft: normalize(10),
          }}
          resizeMode={'stretch'}
          />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  function handleSearch(text) {
    if (text !== "") {
      const updatedData = country.filter((item) => {
        let item_data = null;
        if (isNumber(text)) {
          item_data = `${item.phone})`;
        } else {
          item_data = `${item.name.toUpperCase()})`;
        }
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setCountry(updatedData);
    } else {
      setCountry(props.data);
    }
  }

  return (
    <SafeAreaView>
      <Modal
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        avoidKeyboard={true}
        style={{
          width: "100%",
          alignSelf: "center",
          margin: 0,
        }}
        backdropOpacity={0.5}
        animationInTiming={600}
        animationOutTiming={800}
        onBackButtonPress={() => onBackdropPress()}
        onBackdropPress={() => onBackdropPress()}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            height: "auto",
            maxHeight: props.height,
          }}
        >
          <SafeAreaView style={styles.main}>
            <View style={styles.searchv}>
              <TouchableOpacity style={styles.touch1}>
                <Image
                  resizeMode={"stretch"}
                  source={Icons.search}
                  style={styles.search}
                />
              </TouchableOpacity>

              <TextInput
                style={styles.inputSearch}
                value={search}
                onChangeText={(v) => {
                  setSearch(v);
                  handleSearch(v);
                }}
                placeholder={"Search"}
                placeholderTextColor={Colors.cadet_blue}
              />
            </View>

            <View style={styles.vv}>
              <Text style={styles.txt3}>Country Code</Text>
              <Text style={styles.txt3}>Country Name</Text>
            </View>

            {!_.isEmpty(country) ? (
              <FlatList
                data={country}
                style={{
                  //   marginTop: normalize(18),
                  paddingBottom: normalize(30),
                }}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
              />
            ) : (
              <Text style={[styles.txt2,{
                marginTop: normalize(100),
                fontSize: normalize(12)
              }]}>No Data Found</Text>
            )}
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

CountryPicker.propTypes = {
  modalVisible: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  data: PropTypes.array,
};

CountryPicker.defaultProps = {
  modalVisible: false,
  renderData: null,
  onBackdropPress: null,
  backgroundColor: "white",
  height: normalize(400),
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    backgroundColor: Colors.white,
    height: normalize(350),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
  },
  searchv: {
    width: "90%",
    height: normalize(42),
    borderColor: Colors.cadet_blue,
    borderWidth: normalize(1),
    alignSelf: "center",
    marginTop: normalize(18),
    borderRadius: normalize(30),
    flexDirection: "row",
    alignItems: "center",
  },
  touch1: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    width: normalize(18),
    height: normalize(18),
    tintColor: Colors.cadet_blue,
  },
  inputSearch: {
    width: "80%",
    height: "100%",
    // fontFamily: Fonts.Roboto_Medium,
    fontWeight: '500',
    color: Colors.black,
    fontSize: normalize(14),
  },
  touch2: {
    width: "100%",
    height: normalize(40),
    alignSelf: "center",
    borderBottomColor: Colors.cadet_blue,
    borderBottomWidth: normalize(1),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: normalize(15),
    alignItems: "center",
    // backgroundColor: '#141257'
  },
  txt1: {
    fontSize: normalize(10.5),
    // fontFamily: Fonts.Poppins_Medium,
    fontWeight: '500',
    color: Colors.steel,
    // backgroundColor: Colors.cerulean_blue,
    width: "20%",
  },
  vvv: {
    width: "80%",
    alignItems: "flex-end",
  },
  txt2: {
    fontSize: normalize(10.5),
    // fontFamily: Fonts.Poppins_Medium,
    fontWeight: '500',
    color: Colors.steel,
    // backgroundColor: Colors.cerulean_blue,
    textAlign: "center",
    flexWrap: "wrap",
  },
  vv: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: normalize(40),
    paddingHorizontal: normalize(10),
    marginTop: normalize(15),
    borderTopWidth: normalize(0.7),
    borderBottomColor: Colors.cadet_blue,
    borderBottomWidth: normalize(0.7),
    borderTopColor: Colors.cadet_blue,
  },
  txt3: {
    fontSize: normalize(13),
    // fontFamily: Fonts.Poppins_SemiBold,
    fontWeight: '700',
    color: Colors.cerulean_blue,
  },
});
