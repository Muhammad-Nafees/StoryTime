import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import BackButton from '../reusable-components/addplayer/customBackButton/BackButton';
import StoryUsers from '../categories/StoryUsers';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Img_Paths } from '../../assets/Imagepaths';
import { pinkColor } from '../../screens/Styles/Style';
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const Animals_Sub = ({ }) => {
  const navigation = useNavigation();

  const {
    SPLASH_SCREEN_IMAGE,
    ANIMAL_SHARK,
    ANIMAL_DOG,
    ANIMAL_MANTA,
    ANIMAL_WHALE,
    ANIMAL_CAT,
    ANIMAL_DAIRY,
    ANIMAL_SNAKE,
    ANIMAL_RABBIT,
    ANIMAL_GUINEA,
    ANIMAL_MICE,
    ANIMAL_ELEPHANT,
    ANIMAL_TIGER,
    ANIMAL_LION,
    ANIMAL_CROCODILE,
    ANIMAL_LIZARD,
    ANIMAL_IGUANA,
    ANIMAL_BUTTERFLY,
    ANIMAL_FIREFLY,
    ANIMAL_DOLPHIN,
    ANIMAL_ORCA,
    ANIMAL_POLAR,
    ANIMAL_BEAR,
    ANIMAL_RACOON,
    ANIMAL_GIRAFFE,
    ANIMAL_WOLF,
    ANIMAL_BAT,
    ANIMAL_PENGUINE,
    ANIMAL_HORSE,
    ANIMAL_DEER,
    ANIMAL_DONKEY,
    ANIMAL_ZEBRA,
    ANIMAL_FOX,
    ANIMAL_COYOTE,
    LUDO_ICON,
  } = Img_Paths;
  return (
    <>
      <>
        <View style={styles.first_container}>
          <BackButton onPress={() => navigation.goBack()} />
          <View style={styles.categories_text_container}>
            <Text style={styles.categories_text}>Animals</Text>
          </View>
        </View>

        <View style={styles.text_Input_container}>
          <View style={styles.text_input_child}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={'#000'}
              style={styles.input_field}
            />
            <TouchableOpacity style={styles.add_button}>
              <Text style={styles.add_text}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            paddingVertical: moderateVerticalScale(6),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: responsiveWidth(90),
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <View style={{ marginHorizontal: moderateScale(10) }}>
              <Text
                style={{
                  color: '#393939',
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                Players:
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#395E66',
                paddingHorizontal: moderateScale(14),
                paddingVertical: moderateVerticalScale(4.5),
                borderRadius: 40,
              }}>
              <Text style={{ color: '#FFF', fontSize: responsiveFontSize(1.9) }}>
                @chrislee
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: moderateVerticalScale(6),
                backgroundColor: '#395E66',
                paddingHorizontal: 14,
                paddingVertical: moderateVerticalScale(4.5),
                borderRadius: 40,
              }}>
              <Text style={{ color: '#FFF', fontSize: responsiveFontSize(1.9) }}>
                @Cedrick101
              </Text>
            </View>
            <View
              style={{
                marginTop: responsiveWidth(2),
                backgroundColor: '#395E66',
                paddingHorizontal: 14,
                paddingVertical: moderateVerticalScale(4.5),
                borderRadius: 40,
              }}>
              <Text style={{ color: '#FFF', fontSize: responsiveFontSize(1.9) }}>
                @its me Like
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingTop: responsiveWidth(3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_SHARK}
              text="Shark"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_DOG}
              text="Dog"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_MANTA}
              text="Manta Ray"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>
          <View
            style={{
              paddingVertical: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_WHALE}
              text="Whale"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_CAT}
              text="Cat"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_DAIRY}
              text="Cow"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>
          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_SNAKE}
              text="Snake"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_RABBIT}
              text="Rabbit"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_GUINEA}
              text="Guinea pig"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>
          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_MICE}
              text="Mice"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_ELEPHANT}
              text="Elephant"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_TIGER}
              text="Tiger"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>
          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_LION}
              text="Lion"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_CROCODILE}
              text="Crocodile"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_LIZARD}
              text="Lizard"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>
          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_IGUANA}
              text="Iguana"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_BUTTERFLY}
              text="Butterfly"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_FIREFLY}
              text="Firefly"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>
          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_DOLPHIN}
              text="Dolphin"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_ORCA}
              text="Orca"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_POLAR}
              text="Polar Bear"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>

          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_BEAR}
              text="Bear"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_RACOON}
              text="Racoon"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_GIRAFFE}
              text="Giraffe"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>

          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_WOLF}
              text="Wolf"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_BAT}
              text="bats"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_PENGUINE}
              text="Penguin"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>

          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_HORSE}
              text="Horse"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_DEER}
              text="Deer"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_DONKEY}
              text="Donkey"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>

          <View
            style={{
              paddingBottom: moderateVerticalScale(12),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={ANIMAL_ZEBRA}
              text="Zebra"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_FOX}
              text="Fox"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
            <StoryUsers
              images={ANIMAL_COYOTE}
              text="Coyote"
              mainbgColor="#395E66"
              backgroundColor="#56B6A4"
            />
          </View>

          <View
            style={{
              paddingBottom: moderateVerticalScale(20),
              flexDirection: 'row',
              width: responsiveWidth(90),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <StoryUsers
              images={LUDO_ICON}
              text="Random"
              mainbgColor="#E44173"
              backgroundColor="#EE5F8A"
            />
          </View>
        </View>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: pinkColor,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  first_container: {
    paddingTop: responsiveWidth(6),
    paddingVertical: moderateVerticalScale(8),
    flexDirection: 'row',
    marginLeft: 'auto',
    width: responsiveWidth(95),
    alignItems: 'center',
  },
  back_button: {
    borderRadius: 10,
    width: responsiveWidth(12.9),
    height: responsiveHeight(6.3),
    backgroundColor: '#395E66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left_arrow: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    resizeMode: 'center',
  },
  categories_text_container: {
    paddingHorizontal: moderateScale(20),
  },
  categories_text: {
    color: '#E44173',
    fontSize: responsiveFontSize(2.4),
    fontWeight: '500',
    letterSpacing: 0.36,
  },
  text_Input_container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(2),
  },
  text_input_child: {
    flexDirection: 'row',
    width: responsiveWidth(90),
  },
  input_field: {
    paddingLeft: 30,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    width: responsiveWidth(70),
    backgroundColor: '#FFF',
    color: '#000',
  },
  add_button: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: responsiveWidth(21.5),
    height: responsiveHeight(7),
    backgroundColor: '#395E66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  add_text: {
    fontSize: responsiveFontSize(1.9),
    color: '#FFF',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});

export default Animals_Sub;
