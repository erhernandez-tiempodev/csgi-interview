import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngRedux from 'ng-redux';

import AppComponent from './app.component';
import PostViewComponent from './components/post.component';
import config from './app.config';

export default angular.module('app', [
    uiRouter,
    ngRedux
])
    .config(config)
    .component('interviewApp', AppComponent)
    .component('postView', PostViewComponent)
    .name;