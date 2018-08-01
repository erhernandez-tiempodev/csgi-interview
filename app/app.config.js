import {RootReducer} from './reducers';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export const APP_ROOT = 'app';
export default function config($stateProvider, $locationProvider, $httpProvider, $ngReduxProvider) {
    $httpProvider.useApplyAsync(true);// deffered the resolution of the XHR calls and avoid call one $digest for XHR call.
    $locationProvider.html5Mode(true);// remove the /# from the url and necessary to work with the webpack configuration.

    $stateProvider.state(APP_ROOT, {
        url: '/',
        template: '<interview-app></interview-app>'
    });

    const createLoggerConfigObject = {
        collapsed: true,
        level: 'info',
        diff: true
    };

    $ngReduxProvider.createStoreWith(RootReducer, [thunkMiddleware, createLogger(createLoggerConfigObject)], window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : []);
}