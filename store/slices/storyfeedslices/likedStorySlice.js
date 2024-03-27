import { createSlice } from '@reduxjs/toolkit';

const likedstory_feed_slice = createSlice({
  name: 'LikedStoryFeed',

  initialState: {
    data: [],
    error: null,
    loading: false,
    storyId: '',
    likeCount: 0,
    disLikedCount: 0,
    storyfeedContent: '',
    storyfeedUsername: '',
  },

  reducers: {
    likedstoryfeed: (state, { payload }) => {
      state.storyId = payload;
    },
    likedCountapi: (state, action) => {
      console.log('likecount---', state.likeCount);
      state.likeCount = action.payload;
    },
    likedCountingRTK: (state, { payload }) => {
      state.likeCount = payload;
    },
    disLikedCountingRTK: (state, { payload }) => {
      state.disLikedCount = payload;
    },
    storyFeedContent: (state, { payload }) => {
      state.storyfeedContent = payload;
    },
    storyFeedUsername: (state, { payload }) => {
      state.storyfeedUsername = payload;
    },
  },
});

export default likedstory_feed_slice.reducer;
export const { likedstoryfeed,
  likedCountingRTK,
  disLikedCountingRTK,
  storyFeedContent,
  storyFeedUsername
} = likedstory_feed_slice.actions;
