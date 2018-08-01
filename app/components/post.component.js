import { addPostToStore } from '../actions/posts.actions';
import '../app.scss';


class PostController {
    constructor($ngRedux, $scope) {
        this.$ngRedux = $ngRedux;
        this.$scope = $scope;
        this.$scope.submitPostForm = this.submitPostForm;
    }

    $onInit() {
        this.controllerActions = {
            addPostToStore
        };

        this.disconnectRedux = this.$ngRedux.connect(this.mapStateToTarget, this.controllerActions)((state, actions) => {
            this.actions = actions;
        });
    }

    addPostToStore(isValid) {
        if (isValid) {
            this.actions.addPostToStore(this.$scope.post);
            this.clearForm();
        }
    }

    clearForm() {
        this.$scope.post = {};
        this.$scope.postForm.title.$touched = false;
        this.$scope.postForm.author.$touched = false;
        this.$scope.postForm.body.$touched = false;
    }

    $onDestroy() {
        this.disconnectRedux();
    }
}

export default {
    template: require('../templates/post.template.html'),
    controller: PostController
}