import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import BackButton from '../../../../components/BackButton';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NavigationsString from '../../../../constants/NavigationsString';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {Img_Paths} from '../../../../assets/Imagepaths';
import {TextColorGreen} from '../../../Styles/Style';
import TouchableButton from '../../../../components/TouchableButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateSequencePlayers} from '../../../../../store/slices/SequencePlayer';
import {PassionOne_Regular} from '../../../../constants/GlobalFonts';

const Sequence = () => {
  const {FIRSTSCREENPLAYFLOW} = NavigationsString;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {SPLASH_SCREEN_IMAGE} = Img_Paths;
  const counters = useSelector(state => state?.SequencePlayer?.counters);
  const addedUsers = useSelector(state => state.addPlayers.addFriends);
  const {user} = useSelector(state => state?.authSlice);
  const USER = user?.data?.user || user?.data;

  const sequenceUser = useMemo(
    () => [...addedUsers, (USER?._id && USER?.username && {"userid": USER?._id, username: USER?.username})],
    [USER, addedUsers],
  );
  const [randomNumbers, setRandomNumbers] = useState([]);
  const {LEFT_ARROW_IMG} = Img_Paths;
  const [selectedIndices, setSelectedIndices] = useState([]);
  console.log("🚀 ~ Sequence ~ selectedIndices:", selectedIndices)

  const handlePress = index => {
    const updatedIndices = [...selectedIndices];

    const selectedIndex = updatedIndices.indexOf(index);

    if (selectedIndex !== -1) {
      // If the index is already selected, remove it
      updatedIndices.splice(selectedIndex, 1);
    } else {
      // If the index is not selected, add it
      updatedIndices.push(index);
    }

    // Update the state with individual counts for each selected index
    const numberedIndices = updatedIndices.reduce((acc, val, idx) => {
      acc[val] = idx + 1;
      return acc;
    }, {});

    console.log('selecindex----', selectedIndex);
    console.log('updaed-----', numberedIndices);

    // Update the state
    setSelectedIndices(updatedIndices);
  };

  const handlesequence = () => {
    const allValuesSelected = selectedIndices.length === sequenceUser.length;
    if (allValuesSelected) {
      navigation.navigate('PLayFlowScreens', {
        screen: FIRSTSCREENPLAYFLOW,
      });
    }
  };

  const handleShuffle = () => {
    const length = sequenceUser?.length

    const numbers = Array.from({ length }, (_, index) => index); // Create an array [0, 1, 2, ..., length - 1]
    const randomArray = [];
  
    while (numbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbers.length); // Generate random index
      const randomNumber = numbers.splice(randomIndex, 1)[0]; // Remove and get the number at the random index
      randomArray.push(randomNumber); // Add the number to the random array
    }
  
    console.log("🚀 ~ handleShuffle ~ randomArray:", randomArray)
    setSelectedIndices(randomArray)
  };

//   const handleShuffle = () =>{
//     const length = sequenceUser?.length
//     const randomArray = [];
//     for (let i = 0; i < length; i++) {
//       const randomNumber = Math.floor(Math.random() * length);
//       randomArray.push(randomNumber);
//     }

//   }

  return (
    <ImageBackground
      source={SPLASH_SCREEN_IMAGE}
      style={{height: '100%', width: '100%'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            paddingVertical: moderateVerticalScale(18),
            paddingTop: responsiveWidth(5),
            flexDirection: 'row',
            width: responsiveWidth(90),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BackButton
              backimage={LEFT_ARROW_IMG}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{
                color: '#E44173',
                fontSize: responsiveFontSize(2.2),
                paddingHorizontal: moderateScale(10),
                fontWeight: '600',
              }}>
              Sequence
            </Text>
          </View>

          <TouchableOpacity
          onPress={handleShuffle}
            style={{
              borderRadius: 10,
              width: responsiveWidth(12.9),
              height: responsiveHeight(6.3),
              backgroundColor: '#395E66',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: responsiveWidth(8),
                height: responsiveHeight(4),
                resizeMode: 'center',
              }}
              source={require('../../../../assets/subCategory/sequence-dice.png')}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={{height: responsiveHeight(72)}}>
          {sequenceUser.map((item, index) => {
            const bgColor = item?.userid === USER?._id ? "#E44173" :TextColorGreen
            return (<>
              <View
                key={index}
                style={{
                  paddingVertical: moderateVerticalScale(8),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: responsiveWidth(90),
                }}>
                <TouchableOpacity
                  onPress={() => handlePress(index)}
                  activeOpacity={0.7}
                  style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: selectedIndices.includes(index)
                        ? bgColor
                        : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: responsiveWidth(14),
                      height: responsiveWidth(14),
                      borderWidth: 4,
                      borderRadius: 10,
                      borderColor: bgColor,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontFamily: PassionOne_Regular.passionOne,
                        fontSize: responsiveFontSize(4),
                      }}>
                      {selectedIndices.includes(index)
                        ? selectedIndices.indexOf(index) + 1
                        : ''}
                    </Text>
                    {/* <View style={{ justifyContent: "flex-end", alignItems: "center", height: responsiveHeight(2), paddingHorizontal: 2 }}>
                                                <View style={{ width: responsiveWidth(1.8), height: responsiveHeight(0.7), backgroundColor: "#FFF", borderRadius: 50 }} />
                                            </View> */}
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    width: responsiveWidth(71),
                    borderLeftColor: '#000',
                    borderLeftWidth: 4,
                    backgroundColor: bgColor,
                    padding: moderateScale(14),
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontWeight: '500',
                      fontSize: responsiveFontSize(1.9),
                    }}>
                    {item.username}
                  </Text>
                </View>
              </View>
            </>)
})}
        </ScrollView>

        <View>
          <TouchableButton
            onPress={() => handlesequence()}
            backgroundColor={TextColorGreen}
            text="Next"
            color="#FFF"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Sequence;
