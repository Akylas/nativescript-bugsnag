import { BreadcrumbType } from 'nativescript-bugsnag';

declare class TestClass {
    static someMethod();
}

export default {
    name: 'Home',
    template: `
    <Page>
      <ActionBar title="Bugsnag Demo">
      </ActionBar>
      <StackLayout>
        <Button text="leaveBreadcrumb" @tap="leaveBreadcrumb"/>
        <Button text="leaveBreadcrumb2" @tap="leaveBreadcrumb2"/>
        <Button text="notify" @tap="notify"/>
        <Button text="throwError" @tap="throwError"/>
        <Button text="crashTest" @tap="crashTest"/>
        <Button text="nativeCrashTest" @tap="nativeCrashTest"/>
      </StackLayout>
    </Page>
    `,
    // data() {
    // },
    // mounted() {
    // },
    methods: {
        notify() {
            // throw new Error('test_error');
            this.$bugsnag.notify(new Error('test_notify_error' + Date.now()));
        },
        throwError() {
            throw new Error('test_thrown_error');
            // this.$bugsnag.notify(new Error('test_error'));
        },
        leaveBreadcrumb() {
            this.$bugsnag.leaveBreadcrumb('leaveBreadcrumb');
        },
        leaveBreadcrumb2() {
            this.$bugsnag.leaveBreadcrumb('leaveBreadcrumb', BreadcrumbType.ERROR, { toto: 1, tata: 'test' });
        },
        crashTest() {
            this.thisShouldCrash();
        },
        nativeCrashTest() {
            TestClass.someMethod();
        }
    }
};
