import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import BackButton from '../../../../components/reuseable-components/BackButton';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import NavigationsString from '../../../../constants/NavigationsString';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../../assets/Imagepaths';
import { TextColorGreen } from '../../../Styles/Style';
import TouchableButton from '../../../../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Inter_Medium, PassionOne_Regular } from '../../../../constants/GlobalFonts';
import { Path, Svg } from 'react-native-svg';
import { addFriends, rearrangedFriends, userId } from '../../../../../store/slices/addplayers/addPlayersSlice';

const Sequence = () => {
  const { FIRSTSCREENPLAYFLOW } = NavigationsString;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { SPLASH_SCREEN_IMAGE } = Img_Paths;
  const counters = useSelector(state => state?.SequencePlayer?.counters);
  const addedUsers = useSelector(state => state.addPlayers.addFriends);
  const { user } = useSelector(state => state?.authSlice);
  const USER = user?.data?.user || user?.data;
  const [randomNumbers, setRandomNumbers] = useState([]);
  const { LEFT_ARROW_IMG } = Img_Paths;
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isUsername, setIsUsername] = useState("")
  const [userCounts, setUserCounts] = useState({});

  const sequenceUser = useMemo(() => [...addedUsers, (USER?._id && USER?.username && { "userid": USER?._id, username: USER?.username })], [USER, addedUsers],);

  // console.log("selectedIndices  : ", selectedIndices);
  // console.log("sequenceUser  : ", sequenceUser);

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
    // const userIds = sequenceUser.map((user) => user?.userid);
    // console.log("userids--Redux ", userIds)
    dispatch(rearrangedFriends({ selectedIndices: selectedIndices, sequenceUser: sequenceUser, }));

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
    setSelectedIndices(randomArray)
  };


  return (
    <ImageBackground
      source={SPLASH_SCREEN_IMAGE}
      style={{ height: '100%', width: '100%' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            paddingVertical: moderateVerticalScale(18),
            paddingTop: responsiveWidth(5),
            flexDirection: 'row',
            width: responsiveWidth(90),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

            <Svg width="33" height="29" viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M12.4613 27.7528H3.11264C1.67464 27.7528 0.507324 26.5545 0.507324 25.0783V15.4777C0.507324 14.0016 1.67464 12.8032 3.11264 12.8032H12.4647C13.9027 12.8032 15.07 14.0016 15.07 15.4777V25.0783C15.07 26.5545 13.9027 27.7528 12.4613 27.7528Z" fill="white" />
              <Path d="M12.4615 28.2736H3.11285C1.3974 28.2736 0 26.839 0 25.078V15.4775C0 13.7165 1.3974 12.282 3.11285 12.282H12.4649C14.1804 12.282 15.5778 13.7165 15.5778 15.4775V25.078C15.5778 26.839 14.1804 28.2736 12.4615 28.2736ZM3.11285 13.324C1.95568 13.324 1.01506 14.2896 1.01506 15.4775V25.078C1.01506 26.2659 1.95568 27.2315 3.11285 27.2315H12.4649C13.6221 27.2315 14.5627 26.2659 14.5627 25.078V15.4775C14.5627 14.2896 13.6221 13.324 12.4649 13.324H3.11285Z" fill="#4F747C" />
              <Path d="M6.60449 20.2779C6.60449 20.4376 6.63512 20.5957 6.69464 20.7432C6.75415 20.8907 6.84138 21.0247 6.95135 21.1376C7.06131 21.2505 7.19186 21.34 7.33554 21.4011C7.47922 21.4622 7.63321 21.4936 7.78873 21.4936C7.94424 21.4936 8.09824 21.4622 8.24191 21.4011C8.38559 21.34 8.51614 21.2505 8.62611 21.1376C8.73607 21.0247 8.8233 20.8907 8.88282 20.7432C8.94233 20.5957 8.97296 20.4376 8.97296 20.2779C8.97296 19.9555 8.84819 19.6463 8.62611 19.4183C8.40402 19.1903 8.10281 19.0623 7.78873 19.0623C7.47465 19.0623 7.17343 19.1903 6.95135 19.4183C6.72926 19.6463 6.60449 19.9555 6.60449 20.2779Z" fill="white" />
              <Path d="M7.78893 22.0142C6.85508 22.0142 6.09717 21.2361 6.09717 20.2775C6.09717 19.3188 6.85508 18.5408 7.78893 18.5408C8.72279 18.5408 9.4807 19.3188 9.4807 20.2775C9.4807 21.2361 8.72279 22.0142 7.78893 22.0142ZM7.78893 19.5793C7.41674 19.5793 7.11223 19.8919 7.11223 20.274C7.11223 20.6561 7.41674 20.9687 7.78893 20.9687C8.16112 20.9687 8.46564 20.6561 8.46564 20.274C8.46564 19.8919 8.16112 19.5793 7.78893 19.5793Z" fill="#4F747C" />
              <Path d="M3.15674 16.2379C3.15674 16.5603 3.28151 16.8695 3.50359 17.0975C3.72568 17.3255 4.02689 17.4536 4.34097 17.4536C4.65505 17.4536 4.95627 17.3255 5.17835 17.0975C5.40044 16.8695 5.52521 16.5603 5.52521 16.2379C5.52521 15.9155 5.40044 15.6063 5.17835 15.3783C4.95627 15.1503 4.65505 15.0222 4.34097 15.0222C4.02689 15.0222 3.72568 15.1503 3.50359 15.3783C3.28151 15.6063 3.15674 15.9155 3.15674 16.2379Z" fill="white" />
              <Path d="M4.34118 17.9749C3.40732 17.9749 2.64941 17.1968 2.64941 16.2382C2.64941 15.2795 3.40732 14.5015 4.34118 14.5015C5.27503 14.5015 6.03294 15.2795 6.03294 16.2382C6.03294 17.1968 5.27165 17.9749 4.34118 17.9749ZM4.34118 15.5435C3.96899 15.5435 3.66447 15.8561 3.66447 16.2382C3.66447 16.6202 3.96899 16.9329 4.34118 16.9329C4.71337 16.9329 5.01788 16.6202 5.01788 16.2382C5.01788 15.8561 4.71337 15.5435 4.34118 15.5435Z" fill="#4F747C" />
              <Path d="M10.0527 16.2379C10.0527 16.5603 10.1775 16.8695 10.3996 17.0975C10.6217 17.3255 10.9229 17.4536 11.237 17.4536C11.551 17.4536 11.8523 17.3255 12.0744 17.0975C12.2964 16.8695 12.4212 16.5603 12.4212 16.2379C12.4212 15.9155 12.2964 15.6063 12.0744 15.3783C11.8523 15.1503 11.551 15.0222 11.237 15.0222C10.9229 15.0222 10.6217 15.1503 10.3996 15.3783C10.1775 15.6063 10.0527 15.9155 10.0527 16.2379Z" fill="white" />
              <Path d="M11.2362 17.9749C10.3023 17.9749 9.54443 17.1968 9.54443 16.2382C9.54443 15.2795 10.3023 14.5015 11.2362 14.5015C12.1701 14.5015 12.928 15.2795 12.928 16.2382C12.928 17.1968 12.1701 17.9749 11.2362 17.9749ZM11.2362 15.5435C10.864 15.5435 10.5595 15.8561 10.5595 16.2382C10.5595 16.6202 10.864 16.9329 11.2362 16.9329C11.6084 16.9329 11.9129 16.6202 11.9129 16.2382C11.9129 15.8561 11.6084 15.5435 11.2362 15.5435Z" fill="#4F747C" />
              <Path d="M3.15674 24.3138C3.15674 24.6363 3.28151 24.9455 3.50359 25.1735C3.72568 25.4015 4.02689 25.5295 4.34097 25.5295C4.65505 25.5295 4.95627 25.4015 5.17835 25.1735C5.40044 24.9455 5.52521 24.6363 5.52521 24.3138C5.52521 23.9914 5.40044 23.6822 5.17835 23.4542C4.95627 23.2262 4.65505 23.0981 4.34097 23.0981C4.02689 23.0981 3.72568 23.2262 3.50359 23.4542C3.28151 23.6822 3.15674 23.9914 3.15674 24.3138Z" fill="white" />
              <Path d="M4.34118 26.0508C3.40732 26.0508 2.64941 25.2728 2.64941 24.3141C2.64941 23.3554 3.40732 22.5774 4.34118 22.5774C5.27503 22.5774 6.03294 23.3554 6.03294 24.3141C6.03294 25.2728 5.27165 26.0508 4.34118 26.0508ZM4.34118 23.6194C3.96899 23.6194 3.66447 23.932 3.66447 24.3141C3.66447 24.6962 3.96899 25.0088 4.34118 25.0088C4.71337 25.0088 5.01788 24.6962 5.01788 24.3141C5.01788 23.932 4.71337 23.6194 4.34118 23.6194Z" fill="#4F747C" />
              <Path d="M10.0527 24.3138C10.0527 24.6363 10.1775 24.9455 10.3996 25.1735C10.6217 25.4015 10.9229 25.5295 11.237 25.5295C11.551 25.5295 11.8523 25.4015 12.0744 25.1735C12.2964 24.9455 12.4212 24.6363 12.4212 24.3138C12.4212 23.9914 12.2964 23.6822 12.0744 23.4542C11.8523 23.2262 11.551 23.0981 11.237 23.0981C10.9229 23.0981 10.6217 23.2262 10.3996 23.4542C10.1775 23.6822 10.0527 23.9914 10.0527 24.3138Z" fill="white" />
              <Path d="M11.2362 26.0508C10.3023 26.0508 9.54443 25.2728 9.54443 24.3141C9.54443 23.3554 10.3023 22.5774 11.2362 22.5774C12.1701 22.5774 12.928 23.3554 12.928 24.3141C12.928 25.2728 12.1701 26.0508 11.2362 26.0508ZM11.2362 23.6194C10.864 23.6194 10.5595 23.932 10.5595 24.3141C10.5595 24.6962 10.864 25.0088 11.2362 25.0088C11.6084 25.0088 11.9129 24.6962 11.9129 24.3141C11.9129 23.932 11.6084 23.6194 11.2362 23.6194Z" fill="#4F747C" />
              <Path d="M30.9284 13.8938L22.7809 18.6037C21.5256 19.3296 19.9387 18.8711 19.2315 17.586L14.6435 9.22202C13.9363 7.93338 14.3829 6.30435 15.6349 5.57841L23.7824 0.868466C25.0377 0.142524 26.6246 0.601014 27.3317 1.88618L31.9198 10.2501C32.6269 11.5388 32.1803 13.1713 30.9284 13.8938Z" fill="white" />
              <Path d="M21.5059 19.4683C20.4164 19.4683 19.3573 18.8813 18.7889 17.8393L14.2008 9.47532C13.7914 8.73201 13.6899 7.86713 13.9166 7.04741C14.1433 6.22768 14.6644 5.53995 15.3885 5.12314L23.536 0.413197C24.2601 -0.00708604 25.1026 -0.111288 25.9011 0.12143C26.703 0.350675 27.3695 0.889054 27.7756 1.63236L32.3636 9.99633C32.773 10.7396 32.8745 11.6045 32.6478 12.4242C32.4245 13.2474 31.9001 13.9317 31.176 14.3485L23.0285 19.0585C22.548 19.3363 22.0236 19.4683 21.5059 19.4683ZM25.0586 1.04536C24.7033 1.04536 24.3514 1.13914 24.0334 1.32323L15.8858 6.0297C15.3986 6.31105 15.0467 6.77301 14.8945 7.32528C14.7422 7.87755 14.8133 8.46109 15.0873 8.96126L19.6754 17.3252C20.2438 18.3603 21.5262 18.7285 22.5345 18.145L30.682 13.435C31.1692 13.1537 31.5211 12.6917 31.6734 12.1394C31.8256 11.5837 31.7546 11.0036 31.4805 10.5035L26.8925 2.14295C26.6184 1.64278 26.1684 1.28155 25.6304 1.12525C25.4409 1.06967 25.2481 1.04536 25.0586 1.04536Z" fill="#4F747C" />
              <Path d="M22.0977 9.73596C22.0977 10.0584 22.2224 10.3676 22.4445 10.5956C22.6666 10.8236 22.9678 10.9517 23.2819 10.9517C23.596 10.9517 23.8972 10.8236 24.1193 10.5956C24.3414 10.3676 24.4661 10.0584 24.4661 9.73596C24.4661 9.41354 24.3414 9.10432 24.1193 8.87633C23.8972 8.64834 23.596 8.52026 23.2819 8.52026C22.9678 8.52026 22.6666 8.64834 22.4445 8.87633C22.2224 9.10432 22.0977 9.41354 22.0977 9.73596Z" fill="white" />
              <Path d="M23.2857 11.4761C23.1334 11.4761 22.9778 11.4553 22.8289 11.4101C22.3924 11.2851 22.0304 10.9933 21.8105 10.5904C21.5872 10.1875 21.533 9.71856 21.6548 9.27049C21.7766 8.82242 22.0609 8.45077 22.4534 8.22499C22.8458 7.99575 23.3026 7.94017 23.7391 8.06522C24.1756 8.19026 24.5376 8.48203 24.7575 8.88494C24.9808 9.28786 25.035 9.75677 24.9132 10.2048C24.7914 10.6529 24.5072 11.0246 24.1147 11.2503C23.8541 11.3997 23.5699 11.4761 23.2857 11.4761ZM23.2823 9.04125C23.1673 9.04125 23.0522 9.07251 22.9507 9.13155C22.7917 9.22186 22.68 9.37122 22.6293 9.55184C22.5819 9.73245 22.6022 9.92002 22.6902 10.0798C22.7782 10.243 22.9237 10.3577 23.0996 10.4098C23.2755 10.4584 23.4583 10.4376 23.6139 10.3472C23.7729 10.2569 23.8846 10.1076 23.9353 9.92696C23.9827 9.74635 23.9624 9.55878 23.8744 9.39901C23.7865 9.23576 23.641 9.12113 23.465 9.06903C23.4041 9.04819 23.3432 9.04125 23.2823 9.04125Z" fill="#4F747C" />
              <Path d="M17.1646 7.95422C17.1646 8.27664 17.2893 8.58586 17.5114 8.81384C17.7335 9.04183 18.0347 9.16991 18.3488 9.16991C18.6629 9.16991 18.9641 9.04183 19.1862 8.81384C19.4083 8.58586 19.533 8.27664 19.533 7.95422C19.533 7.6318 19.4083 7.32258 19.1862 7.09459C18.9641 6.86661 18.6629 6.73853 18.3488 6.73853C18.0347 6.73853 17.7335 6.86661 17.5114 7.09459C17.2893 7.32258 17.1646 7.6318 17.1646 7.95422Z" fill="white" />
              <Path d="M18.3493 9.69109C17.7572 9.69109 17.182 9.37154 16.8707 8.80538C16.414 7.97176 16.7016 6.90889 17.517 6.43998C18.329 5.97107 19.3644 6.26631 19.8212 7.1034C20.278 7.93702 19.9904 8.99989 19.1749 9.4688C18.9178 9.62163 18.6302 9.69109 18.3493 9.69109ZM18.346 7.25971C18.2343 7.25971 18.1193 7.2875 18.0144 7.35002C17.6896 7.53758 17.5745 7.96481 17.7572 8.29826C17.9399 8.63171 18.3561 8.7498 18.6809 8.56224C19.0058 8.37467 19.1208 7.94744 18.9381 7.614C18.8129 7.38822 18.5828 7.25971 18.346 7.25971Z" fill="#4F747C" />
              <Path d="M27.0312 11.5179C27.0313 11.8404 27.156 12.1496 27.3781 12.3776C27.6002 12.6056 27.9014 12.7336 28.2155 12.7336C28.5296 12.7336 28.8308 12.6056 29.0529 12.3776C29.275 12.1496 29.3997 11.8404 29.3997 11.5179C29.3997 11.1955 29.275 10.8863 29.0529 10.6583C28.8308 10.4303 28.5296 10.3022 28.2155 10.3022C27.9014 10.3022 27.6002 10.4303 27.3781 10.6583C27.156 10.8863 27.0312 11.1955 27.0312 11.5179Z" fill="white" />
              <Path d="M28.218 13.2546C27.6259 13.2546 27.0507 12.935 26.7394 12.3689C26.2826 11.5352 26.5702 10.4724 27.3857 10.0035C28.1977 9.53455 29.2331 9.82979 29.6898 10.6669C30.1466 11.5005 29.859 12.5634 29.0436 13.0323C28.783 13.1851 28.4988 13.2546 28.218 13.2546ZM28.2146 10.8232C28.103 10.8232 27.9879 10.851 27.883 10.9135C27.5582 11.1011 27.4432 11.5283 27.6259 11.8617C27.8086 12.1952 28.2248 12.3133 28.5496 12.1257C28.8744 11.9381 28.9894 11.5109 28.8067 11.1775C28.6815 10.9482 28.4515 10.8232 28.2146 10.8232Z" fill="#4F747C" />
            </Svg>

          </TouchableOpacity>
        </View>

        <ScrollView style={{ height: responsiveHeight(72) }}>
          {sequenceUser.map((item, index) => {
            const bgColor = item?.userid === USER?._id ? "#E44173" : TextColorGreen
            return (
              <>
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
                    style={{ flexDirection: 'row' }}>
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
                        flexDirection: "row"
                      }}>
                      <Text
                        style={{
                          color: '#FFF',
                          fontFamily: PassionOne_Regular.passionOne,
                          fontSize: responsiveFontSize(4),
                        }}>{selectedIndices.includes(index) ? selectedIndices.indexOf(index) + 1 : ''}
                      </Text>

                      <View style={{ justifyContent: "flex-end", alignItems: "center", height: responsiveHeight(2.5), paddingHorizontal: 2 }}>
                        <View style={{ width: responsiveWidth(1.9), height: responsiveHeight(0.7), backgroundColor: "#FFF", borderRadius: 50 }} />
                      </View>

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
                        fontFamily: Inter_Medium.Inter_Medium
                      }}>
                      {`@${item?.username}`}
                    </Text>
                  </View>
                </View>
              </>
            )
          })}
        </ScrollView>

        <View>
          <TouchableButton
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
