const { readFileSync } = require('fs');

const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

const { join, relative, resolve, sep } = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require('nativescript-vue-template-compiler');

const nsWebpack = require('nativescript-dev-webpack');
const nativescriptTarget = require('nativescript-dev-webpack/nativescript-target');
const { NativeScriptWorkerPlugin } = require('nativescript-worker-loader/NativeScriptWorkerPlugin');
const hashSalt = Date.now().toString();

module.exports = env => {
    // add your custom Activities, Services and other android app components here.
    const appComponents = ['tns-core-modules/ui/frame', 'tns-core-modules/ui/frame/activity'];

    const platform = env && ((env.android && 'android') || (env.ios && 'ios'));
    if (!platform) {
        throw new Error('You need to provide a target platform!');
    }

    const platforms = ['ios', 'android'];
    const projectRoot = __dirname;

    // default destination inside platforms/<platform>/...
    const dist = resolve(projectRoot, nsWebpack.getAppPath(platform, projectRoot));

    const {
        // the 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file.
        appPath = 'app',
        appResourcesPath = 'app/App_Resources',

        // you can provide the following flags when running 'tns run android|ios'
        snapshot, // --env.snapshot
        production, // --env.production
        development, // --env.development
        report, // --env.report
        hmr, // --env.hmr
        sourceMap, // --env.sourceMap
        hiddenSourceMap, // --env.hiddenSourceMap
        unitTesting, // --env.unitTesting
        verbose, // --env.verbose
        snapshotInDocker, // --env.snapshotInDocker
        skipSnapshotTools // --env.skipSnapshotTools
    } = env;


    const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
    const externals = nsWebpack.getConvertedExternals(env.externals);

    const mode = production ? 'production' : 'development';

    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    let aliases = {
        '~': appFullPath,
        '@': appFullPath,
        vue: 'nativescript-vue'
    };
    if (!!development) {
        const srcFullPath = resolve(projectRoot, '..', 'src');
        console.log('running webpack for live development', srcFullPath);
        aliases = Object.assign(aliases, {
            '#': srcFullPath,
            'nativescript-bugsnag': '#/bugsnag.' + platform,
            'nativescript-bugsnag$': '#/bugsnag.' + platform
        });
    }

    const entryModule = nsWebpack.getEntryModule(appFullPath, platform);
    const entryPath = `.${sep}${entryModule}`;
    const entries = { bundle: entryPath };
    const areCoreModulesExternal = Array.isArray(env.externals) && env.externals.some(e => e.indexOf('tns-core-modules') > -1);
    if (platform === 'ios' && !areCoreModulesExternal) {
        entries['tns_modules/tns-core-modules/inspector_modules'] = 'inspector_modules';
    }
    console.log(`Bundling application for entryPath ${entryPath}...`);

    const sourceMapFilename = nsWebpack.getSourceMapFilename(hiddenSourceMap, __dirname, dist);

    const itemsToClean = [`${dist}/**/*`];
    if (platform === 'android') {
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'src', 'main', 'assets', 'snapshots')}`);
        itemsToClean.push(`${join(projectRoot, 'platforms', 'android', 'app', 'build', 'configurations', 'nativescript-android-snapshot')}`);
    }

    nsWebpack.processAppComponents(appComponents, platform);
    const config = {
        mode,
        context: appFullPath,
        externals,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // don't watch hidden files
                '**/.*'
            ]
        },
        target: nativescriptTarget,
        // target: nativeScriptVueTarget,
        entry: entries,
        output: {
            pathinfo: false,
            path: dist,
            sourceMapFilename,
            libraryTarget: 'commonjs2',
            filename: '[name].js',
            globalObject: 'global',
            hashSalt,
            devtoolModuleFilenameTemplate: info => info.absoluteResourcePath.split('?')[0],
            devtoolFallbackModuleFilenameTemplate: info => info.absoluteResourcePath.split('?')[0]
        },
        resolve: {
            extensions: ['.vue', '.ts', '.js', '.scss', '.css'],
            // resolve {N} system modules from tns-core-modules
            modules: [resolve(__dirname, 'node_modules/tns-core-modules'), resolve(__dirname, 'node_modules'), 'node_modules/tns-core-modules', 'node_modules'],
            alias: aliases,
            // resolve symlinks to symlinked modules
            symlinks: true
        },
        resolveLoader: {
            // don't resolve symlinks to symlinked loaders
            symlinks: false
        },
        node: {
            // disable node shims that conflict with NativeScript
            http: false,
            timers: false,
            setImmediate: false,
            fs: 'empty',
            __dirname: false
        },
        devtool: hiddenSourceMap ? 'hidden-source-map' : sourceMap ? 'source-map' : 'none',
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: module => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName) || appComponents.some(comp => comp === moduleName);
                        },
                        enforce: true
                    }
                }
            },
            minimize: Boolean(production),
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: isAnySourceMapEnabled,
                    terserOptions: {
                        output: {
                            comments: false,
                            semicolons: !isAnySourceMapEnabled
                        },
                        compress: {
                            // the Android SBG has problems parsing the output
                            // when these options are enabled
                            collapse_vars: platform !== 'android',
                            sequences: platform !== 'android'
                        },
                        keep_fnames: true
                    }
                })
            ]
        },
        module: {
            rules: [
                {
                    include: [join(appFullPath, entryPath + '.js'), join(appFullPath, entryPath + '.ts')],
                    use: [
                        // require all Android app components
                        platform === 'android' && {
                            loader: 'nativescript-dev-webpack/android-app-components-loader',
                            options: { modules: appComponents }
                        },

                        {
                            loader: 'nativescript-dev-webpack/bundle-config-loader',
                            options: {
                                registerPages: true, // applicable only for non-angular apps
                                loadCss: !snapshot, // load the application css if in debug mode
                                unitTesting,
                                appFullPath,
                                projectRoot,
                                ignoredFiles: nsWebpack.getUserDefinedEntries(entries, platform)
                            }
                        }
                    ].filter(loader => Boolean(loader))
                },
                {
                    test: /\.css$/,
                    use: ['nativescript-dev-webpack/style-hot-loader', 'nativescript-dev-webpack/apply-css-loader.js', { loader: 'css-loader', options: { url: false } }]
                },
                {
                    test: /\.scss$/,
                    use: ['nativescript-dev-webpack/style-hot-loader', 'nativescript-dev-webpack/apply-css-loader.js', { loader: 'css-loader', options: { url: false } }, 'sass-loader']
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        allowTsInNodeModules: true,
                        compilerOptions: {
                            declaration: false
                        }
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        compiler: NsVueTemplateCompiler
                    }
                }
            ]
        },
        plugins: [
            // ... Vue Loader plugin omitted
            // make sure to include the plugin!
            new VueLoaderPlugin(),
            // define useful constants like TNS_WEBPACK
            new webpack.DefinePlugin({
                'global.TNS_WEBPACK': 'true',
                TNS_ENV: JSON.stringify(mode),
                process: 'global.process'
            }),
            // remove all files from the out dir.
            new CleanWebpackPlugin({ verbose: !!verbose, cleanOnceBeforeBuildPatterns: itemsToClean }),
            // copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([{ from: { glob: 'fonts/**' } }, { from: { glob: '**/*.+(jpg|png)' } }, { from: { glob: 'assets/**/*' } }], {
                ignore: [`${relative(appPath, appResourcesFullPath)}/**`]
            }),
            new nsWebpack.GenerateNativeScriptEntryPointsPlugin('bundle'),
            // for instructions on how to set up workers with webpack
            // check out https://github.com/nativescript/worker-loader
            new NativeScriptWorkerPlugin(),
            new nsWebpack.PlatformFSPlugin({
                platform,
                platforms
            }),
            // does IPC communication with the {N} CLI to notify events when running in watch mode.
            new nsWebpack.WatchStateLoggerPlugin()
        ]
    };

    if (unitTesting) {
        config.module.rules.push(
            {
                test: /-page\.js$/,
                use: 'nativescript-dev-webpack/script-hot-loader'
            },
            {
                test: /\.(html|xml)$/,
                use: 'nativescript-dev-webpack/markup-hot-loader'
            },

            { test: /\.(html|xml)$/, use: 'nativescript-dev-webpack/xml-namespace-loader' }
        );
    }

    if (report) {
        // generate report files for bundles content
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                generateStatsFile: true,
                reportFilename: resolve(projectRoot, 'report', 'report.html'),
                statsFilename: resolve(projectRoot, 'report', 'stats.json')
            })
        );
    }

    if (snapshot) {
        config.plugins.push(
            new nsWebpack.NativeScriptSnapshotPlugin({
                chunk: 'vendor',
                requireModules: ['tns-core-modules/bundle-entry-points'],
                projectRoot,
                webpackConfig: config,
                snapshotInDocker,
                skipSnapshotTools
            })
        );
    }

    if (hmr) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    // if (production) {
    const BUGSNAG_KEY = 'c2bac2381b9fed37bfa37453e71a0ea9';
    let appVersion;
    let buildNumber;
    if (platform === 'android') {
        appVersion = readFileSync('app/App_Resources/Android/app.gradle', 'utf8').match(/versionName "((?:[0-9]+\.?)+)"/)[1];
        buildNumber = readFileSync('app/App_Resources/Android/app.gradle', 'utf8').match(/versionCode ([0-9]+)/)[1];
    } else if (platform === 'ios') {
        appVersion = readFileSync('app/App_Resources/iOS/Info.plist', 'utf8').match(/<key>CFBundleShortVersionString<\/key>[\s\n]*<string>(.*?)<\/string>/)[1];
        buildNumber = readFileSync('app/App_Resources/iOS/Info.plist', 'utf8').match(/<key>CFBundleVersion<\/key>[\s\n]*<string>([0-9]*)<\/string>/)[1];
    }
    console.log('appVersion', appVersion, buildNumber);
    config.plugins.push(
        new BugsnagSourceMapUploaderPlugin({
            apiKey: BUGSNAG_KEY,
            appVersion,
            codeBundleId: buildNumber,
            overwrite: true,
            publicPath: '.'
        })
    );

    return config;
};
