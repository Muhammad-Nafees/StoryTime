import { View, Text, Image } from "react-native"
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { moderateScale } from "react-native-size-matters"
import { Path, Svg } from "react-native-svg"



const ErrorMessageForm = ({ errorsField, isSubmitted }) => {
  return (
    <View style={{ height: responsiveHeight(3), }}>
      {isSubmitted && errorsField && (
        <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(1) }}>
          <View style={{ flexDirection: "row", }}>

            <View>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                <Path
                  d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                />
              </Svg>
            </View>
            <View style={{ paddingHorizontal: moderateScale(5) }}>
              <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errorsField}</Text>
            </View>
          </View>
        </View>
      )
      }
    </View>
  )
};

export default ErrorMessageForm;
