import { retrievePosts, savePostToDb } from './actions/posts.actions';
import { GetPostsListSelector, GetIsFetchingSelector } from './app.selectors';
import './app.scss';


class AppController {
    constructor($ngRedux, $scope) {
        this.$ngRedux = $ngRedux;
        this.$scope = $scope;
    }

    $onInit() {
        this.controllerActions = {
            retrievePosts,
            savePostToDb
        };

        this.disconnectRedux = this.$ngRedux.connect(this.mapStateToTarget, this.controllerActions)((state, actions) => {
            this.state = state;
            this.actions = actions;
        });

        this.retrievePosts();
    }

    mapStateToTarget(state) {
        return {
            postsList: GetPostsListSelector(state),
            isFetching: GetIsFetchingSelector(state)
        }
    }

    retrievePosts() {
        this.actions.retrievePosts(response => {
            console.log('response:', response);
        });
    }

    toggleAddPost() {
        return this.$scope.showAddPost = !this.$scope.showAddPost;
    }

    savePostToDb() {
        let state = this.$ngRedux.getState();
        state.posts.postsList.filter(post => post.pendingSave).forEach(post => {
            let newPost = post.asMutable();
            delete newPost.pendingSave;
            this.actions.savePostToDb(newPost);
        });
    }

    $onDestroy() {
        this.disconnectRedux();
    }
}

export default {
    template: require('./app.template.html'),
    controller: AppController
}