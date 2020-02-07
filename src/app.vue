<style lang="less">
    .container {
        height: 100%;
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        // justify-content: space-between;
        box-sizing: border-box;
    }
</style>

<script>
    import wepy from '@wepy/core';
    import eventHub from './common/eventHub';
    import vuex from '@wepy/x';
    wepy.use(vuex);

    wepy.app({
        hooks: {
            // App 级别 hook，对整个 App 生效
            // 同时存在 Page hook 和 App hook 时，优先执行 Page hook，返回值再交由 App hook 处
            'before-setData': function(dirty) {
                return dirty;
            }
        },
        globalData: {
            userInfo: null
        },
        onLaunch() {
            this.testAsync();
            eventHub.$on('app-launch', (...args) => {
                console.log('app-launch event emitted, the params are:');
                console.log(args);
            });
        },
        methods: {
            sleep(s) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('promise resolved')
                    }, s * 1000)
                })
            },
            async testAsync() {
                let d = await this.sleep(3);
            }
        }
    });
</script>

<config>
{
    pages: [
        'pages/index',
        'pages/demo'
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '一杯芒果汁',
        navigationBarTextStyle: 'black'
    },
    "tabBar": {
        "list": [{
            "pagePath": "pages/index",
            "text": "",
            "iconPath": "/static/images/tabBar/home.png",
            "selectedIconPath": "/static/images/tabBar/selected-home.png"
        }, {
            "pagePath": "pages/demo",
            "text": "",
            "iconPath": "/static/images/tabBar/menu.png",
            "selectedIconPath": "/static/images/tabBar/selected-menu.png"
        }]
    },
}
</config>
