import Vue from 'nativescript-vue';
import { getBuildNumber, getVersionName } from 'nativescript-extendedinfo';
import { isAndroid } from 'tns-core-modules/platform';

import { Client } from 'nativescript-bugsnag';

const bugsnag = (Vue.prototype.$bugsnag = new Client());
Promise.all([getVersionName(), getBuildNumber()]).then(res => {
    bugsnag
        .init({
            apiKey: 'c2bac2381b9fed37bfa37453e71a0ea9',
            appVersion: `${res[0]}.${res[1]}${isAndroid ? 1 : 0}`,
            automaticallyCollectBreadcrumbs: false,
            releaseStage: TNS_ENV
        })
        .then(res => {
            bugsnag.enableConsoleBreadcrumbs();
            bugsnag.handleUncaughtErrors();
            console.log('bugsnag did init', !!res);
        })
        .catch(err => {
            console.log('bugsnag  init failed', err);
        });
});

import Home from './views/Home';
new Vue({
    render: h => h('frame', [h(Home)])
}).$start();
