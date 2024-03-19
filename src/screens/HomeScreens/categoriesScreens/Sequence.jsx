
import {
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import {
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { Img_Paths } from '../../../assets/Imagepaths';
import { TextColorGreen } from '../../Styles/Style';
import CustomButton from '../../../components/reusable-components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { rearrangedFriends } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import HeaderSequence from '../../../components/categories/HeaderSequence';
import SelectSequencePlayers from '../../../components/categories/guestCategories/SelectSequencePlayers';


const Sequence = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { SPLASH_SCREEN_IMAGE } = Img_Paths;
  const addedUsers = useSelector(state => state.getcategories.addFriends);
  const { user } = useSelector(state => state?.authSlice);
  const USER = user?.data?.user || user?.data;

  const [selectedIndices, setSelectedIndices] = useState([]);

  const sequenceUser = useMemo(() => [...addedUsers, (USER?._id && USER?.username && { "userid": USER?._id, username: USER?.username })], [USER, addedUsers],);

  const handlePress = index => {

    const updatedIndices = [...selectedIndices];
    const selectedIndex = updatedIndices.indexOf(index);

    if (selectedIndex !== -1) {
      updatedIndices.splice(selectedIndex, 1);
    } else {
      updatedIndices.push(index);
    };
    setSelectedIndices(updatedIndices);
  };

  const handlesequence = () => {
    dispatch(rearrangedFriends({ selectedIndices: selectedIndices, sequenceUser: sequenceUser, }));

    const allValuesSelected = selectedIndices.length === sequenceUser.length;
    if (allValuesSelected) {
      navigation.navigate('PLayFlowScreens', {
        screen: "FirstScreenPlayFlow",
      });
    }
  };

  const handleShuffle = () => {
    const length = sequenceUser?.length;
    const numbers = Array.from({ length }, (_, index) => index); // Create an array [0, 1, 2, ..., length - 1]
    const randomArray = [];

    while (numbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbers.length); // Generate random index
      const randomNumber = numbers.splice(randomIndex, 1)[0]; // Remove and get the number at the random index
      randomArray.push(randomNumber); // Add the number to the random array
    }
    setSelectedIndices(randomArray)
  };


  return (
    <ImageBackground
      source={SPLASH_SCREEN_IMAGE}
      style={{ height: '100%', width: '100%' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* header sequence screen */}
        <HeaderSequence
          handleShuffle={handleShuffle}
        />
        <ScrollView style={{ height: responsiveHeight(72) }}>
          {sequenceUser.map((item, index) => {
            const bgColor = item?.userid === USER?._id ? "#E44173" : TextColorGreen
            return (
              <>
                <SelectSequencePlayers
                  item={item}
                  bgColor={bgColor}
                  selectedIndices={selectedIndices}
                  handlePress={handlePress}
                  index={index}
                />
              </>
            )
          })}
        </ScrollView>

        <View>
          <CustomButton
            onPress={() => handlesequence()}
            backgroundColor={TextColorGreen}
            text="Next"
            type={"sequence"}
            color="#FFF"
            sequenceUser={sequenceUser}
            selectedIndices={selectedIndices}
          />
        </View>

      </View>
    </ImageBackground>
  );
};

export default Sequence;
