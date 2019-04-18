import Vue from 'nativescript-vue';

import { Client } from 'nativescript-bugsnag';

const bugsnag = (Vue.prototype.$bugsnag = new Client());
bugsnag
    .init('YOUR_API_KEY')
    .then(res => {
        bugsnag.enableConsoleBreadcrumbs();
        // bugsnag.handleUncaughtErrors();
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
