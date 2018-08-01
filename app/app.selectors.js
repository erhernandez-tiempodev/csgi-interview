import {createSelector} from 'reselect';

const GetPostsState = state => state.posts;

export const GetPostsListSelector = createSelector(
    [GetPostsState],
    (postsState) => {
        return postsState.postsList;
    }
);

export const GetIsFetchingSelector = createSelector(
    [GetPostsState],
    (postsState) => {
        return postsState.isFetching;
    }
);