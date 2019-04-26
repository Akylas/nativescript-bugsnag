import Vue from 'nativescript-vue';

import { Client } from 'nativescript-bugsnag';

const bugsnag = (Vue.prototype.$bugsnag = new Client());
bugsnag
    .init('c2bac2381b9fed37bfa37453e71a0ea9')
    .then(res => {
        bugsnag.enableConsoleBreadcrumbs();
        bugsnag.handleUncaughtErrors();
        console.log('bugsnag did init', !!res);
    })
    .catch(err => {
        console.log('bugsnag  init failed', err);
    });
import Home from './views/Home';
new Vue({
    render: h => {
        return h('frame', [h(Home)]);
    }
}).$start();
