// import Vue from 'vue';
// import { NativeScriptVueConstructor } from 'nativescript-vue';
import { Client } from 'nativescript-bugsnag';


declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $bugsnag: Client;

    }
}
