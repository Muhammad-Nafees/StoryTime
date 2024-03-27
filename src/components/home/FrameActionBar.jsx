import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// import {useDispatch} from 'react-redux';
import { Img_Paths } from '../../assets/Imagepaths';
import { useNavigation } from '@react-navigation/native';
import { SecondaryColor } from '../../screens/Styles/Style';
import { moderateVerticalScale } from 'react-native-size-matters';

import {
  Menu,
  MenuOption,
  MenuTrigger,
  MenuOptions,
} from 'react-native-popup-menu';
import {
  storyLikedFeed,
  storydisLikedFeed,
} from '../../../services/api/storyfeed';

const FrameActionBar = ({ item, setIsVisible }) => {
  const {
    content,
    creator: { username },
    likedByMe,
    _id: likedUserId,
    dislikesByMe,
    dislikesCount,
    commentsCount,
    likesCount: likesCountuser,
  } = item || {};

  const { SHARE_BTN } = Img_Paths;

  // Hooks
  // const dispatch = useDispatch();
  const navigation = useNavigation();

  // States
  const [isLiked, setIsLiked] = useState(likedByMe);
  const [isDisLike, setIsDisliked] = useState(dislikesByMe);
  const [likeCountUpdated, setLikeCountUpdated] = useState(false);
  const [likesCounting, setLikesCounting] = useState(likesCountuser);
  const [disLikeCountUpdated, setDisLikeCountUpdated] = useState(false);
  const [dislikesCounting, setDisLikesCounting] = useState(dislikesCount);

  // Functions
  const storyLikedHandled = async () => {
    try {
      if (!likeCountUpdated) {
        setLikeCountUpdated(true);

        const responseData = await storyLikedFeed(likedUserId);
        setIsLiked(prevIsLiked => !prevIsLiked);
        if (isLiked && responseData?.data?._id === likedUserId) {
          setLikesCounting(prevCount => prevCount - 1);
        } else {
          setLikesCounting(
            prevCount => responseData?.data?.likes.length || prevCount + 1,
          );
        }
        // dispatch(likedstoryfeed(likesCountuser));

        // Reset flag after updating like count
        setLikeCountUpdated(false);
        return responseData;
      }
    } catch (error) {
      // Handle errors
    }
  };

  const storydisLikedHandled = async () => {
    try {
      if (!disLikeCountUpdated) {
        setDisLikeCountUpdated(true);

        const responseData = await storydisLikedFeed(likedUserId);
        setIsDisliked(prevIsLiked => !prevIsLiked);
        if (isDisLike && responseData?.data?._id === likedUserId) {
          setDisLikesCounting(prevCount => prevCount - 1);
        } else {
          setDisLikesCounting(
            prevCount => responseData?.data?.dislikes.length || prevCount + 1,
          );
        }
        setDisLikeCountUpdated(false);
        return responseData;
      }
    } catch (error) {
      // Handle errors
    }
  };

  const commentsHandled = () => {
    // dispatch(likedstoryfeed(likedUserId));
    // dispatch(likedCountingRTK(likesCounting)); //unused
    // dispatch(disLikedCountingRTK(dislikesCounting)); //unused
    // dispatch(storyFeedContent(content));
    // dispatch(storyFeedUsername(username));
    // Instead of dispatch, we can navigate this data to the next screen
    navigation.navigate('Feedchat', {
      likedUserId,
      likesCounting,
      dislikesCounting,
      content,
      username,
      disLikeCountUpdated,
    });
  };

  return (
    <View style={styles.second_container}>
      <View style={styles.sec_container_firstchild}>
        <View style={styles.fourth_container}>
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              onPress={() => storyLikedHandled()}
              style={styles.actionButton}>
              <Image
                style={styles.actionIcon}
                source={require('../../assets/456-img.png')}
              />
              <Text style={styles.actionText}>{likesCounting}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => storydisLikedHandled()}
              style={styles.actionButton}>
              <Image
                style={styles.actionIcon}
                source={require('../../assets/1.5k-img.png')}
              />
              <Text style={styles.actionText}>{dislikesCounting}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={commentsHandled}
              style={styles.actionButton}>
              <Image
                style={styles.actionIcon}
                source={require('../../assets/message-icon.png')}
              />
              <Text style={styles.actionText}>{commentsCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image style={styles.actionIcon} source={SHARE_BTN} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton}>
              <Menu>
                <MenuTrigger>
                  <Image
                    style={styles.menuIcon}
                    source={require('../../assets/three-dots-mod.png')}
                  />
                </MenuTrigger>

                <MenuOptions customStyles={styles.menuOptions}>
                  <MenuOption
                    onSelect={() => {
                      //   setIsVisible(true);
                      //   dispatch(storyUserId(userId));
                    }}
                    style={styles.menuOption}>
                    <Text style={styles.menuText}>Block</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => {
                      // dispatch(storyUserId(userId));
                      // navigation.navigate(REPORT_USER);
                    }}
                    style={styles.menuOption}>
                    <Text style={styles.menuText}>Report</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  second_container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: responsiveWidth(5),
  },
  sec_container_firstchild: {
    alignItems: 'center',
    flexDirection: 'row',
    width: responsiveWidth(92),
    backgroundColor: '#E44173',
    height: responsiveHeight(7.5),
    marginLeft: responsiveWidth(1),
    justifyContent: 'space-between',
    paddingHorizontal: moderateVerticalScale(50),
  },
  fourth_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(80),
  },
  actionButtonContainer: {
    flexDirection: 'row',
    width: responsiveWidth(53),
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    resizeMode: 'center',
    width: responsiveWidth(9),
    height: responsiveHeight(4.5),
  },
  actionText: {
    fontWeight: '400',
    color: SecondaryColor,
    fontSize: responsiveFontSize(1.7),
  },
  menuContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: responsiveWidth(15),
  },
  menuButton: {
    width: responsiveWidth(6),
  },
  menuIcon: {
    resizeMode: 'center',
    width: responsiveWidth(7),
    height: responsiveHeight(3.5),
  },
  menuOptions: {
    optionsContainer: {
      borderTopLeftRadius: 10,
      width: responsiveWidth(42),
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: responsiveWidth(8),
    },
  },
  menuOption: {
    paddingLeft: responsiveWidth(5),
    paddingVertical: moderateVerticalScale(12),
  },
  menuText: {
    color: '#000',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.9),
  },
});

export default FrameActionBar;
