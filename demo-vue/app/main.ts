import Vue from 'nativescript-vue';

import { Client } from 'nativescript-bugsnag';

const bugsnag = (Vue.prototype.$bugsnag = new Client());
bugsnag
    .init('94987257ab21a3ab7d6ac9240836071a')
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
