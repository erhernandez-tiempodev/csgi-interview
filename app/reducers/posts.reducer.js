import Immutable from 'seamless-immutable';
import {
    RETRIEVE_POSTS,
    ADD_POST_TO_STORE,
    SAVE_POST_TO_DB
} from '../actions/posts.actions';

export const INITIAL_STATE = Immutable({
    postsList: [],
    error: {},
    isFetching: false
});

export default function postReducer(state = INITIAL_STATE, {type, payload = {}}) {
    switch (type) {
        case RETRIEVE_POSTS.BEGIN:
            return state.set('isFetching', true);

        case RETRIEVE_POSTS.FAILURE:
            return state
                .set('error', payload)
                .set('isFetching', false);

        case RETRIEVE_POSTS.SUCCESS:
            return state
                .set('postsList', payload)
                .set('isFetching', false);

        case ADD_POST_TO_STORE.SUCCESS:
            let newState = state.getIn(['postsList']).asMutable({deep: true});
            let newPost = Object.assign({}, { id: newState.length + 1, pendingSave: true }, payload);
            newState.push(newPost);
            return Immutable({postsList: newState, isFetching: false});

        case SAVE_POST_TO_DB.BEGIN:
            return state.set('isFetching', true);

        case SAVE_POST_TO_DB.FAILURE:
            return state
                .set('error', payload)
                .set('isFetching', false);

        case SAVE_POST_TO_DB.SUCCESS:
            let newPostsState = state.getIn(['postsList']).asMutable({deep: true});
            newPostsState.splice(payload.id - 1, 1, payload);
            return Immutable({postsList: newPostsState, isFetching: false});

        default:
            return state;
    }
}