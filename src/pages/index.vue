
<template>
    <div class="container" :style="{height: systemInfo.windowHeight + 'px' }">
        <topBar></topBar>
        <div class="content">
            {{foods[foodIndex]}}
        </div>
        <div class="btn" @click="go">
            Go
        </div>
    </div>
</template>

<script>
    import wepy from '@wepy/core'
    import eventHub from '../common/eventHub';
    import {
        mapState,
        mapActions
    } from '@wepy/x';
    import store from '../store';
    import testMixin from '../mixins/test'
    wepy.page({
        store,
        hooks: {},
        mixins: [],
        data: {
            systemInfo: {},
            windowHeight: 100,
            foods: ['馒头', '肠粉', '面包', '麻辣烫', '抄手', '石锅饭', '三楼'],
            foodIndex: 0,
            run: false,
            positiveNum: 0
        },
        computed: {},
        methods: {
            ...mapActions([
                'setUserInfo'
            ]),
            getUserInfo() {
                const self = this;
                wx.getUserInfo({
                    success(res) {
                        self.setUserInfo(res.userInfo)
                    }
                });
            },
            getSystemInfo() {
                const self = this;
                wx.getSystemInfo({
                    success(res) {
                        self.systemInfo = res;
                    }
                });
            },
            random(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            },
            go() {
                if (this.run) return;
                const self = this;
                const foodsLen = this.foods.length;
                const maxTimes = 3000;
                const d = 100;
                let secondary = 0
                this.run = true;
                let timer = setInterval(() => {
                    if (secondary > maxTimes) {
                        clearInterval(timer);
                        self.run = false;
                        self.positiveNum = 0;
                    }
                    secondary = secondary + d;
                    self.foodIndex = self.random(0, foodsLen)
                }, d);
            },
            shake() {
                const self = this;
                const numX = 1;
                const numY = 1;
                const numZ = 0;
                wx.onAccelerometerChange((res) => {
                    if (this.run) return;
                    const {
                        x,
                        y,
                        z
                    } = res || {}
                    if (x > numX && y > numY) { //个人看法，一次正数算摇一次，还有更复杂的
                        self.positiveNum++
                            setTimeout(() => {
                                self.positiveNum = 0
                            }, 3000) //计时两秒内没有摇到指定次数，重新计算
                    }
                    if (z > numZ && y > numY) { //可以上下摇，上面的是左右摇
                        self.positiveNum++
                            setTimeout(() => {
                                self.positiveNum = 0
                            }, 3000) //计时两秒内没有摇到指定次数，重新计算
                    }
                    if (self.positiveNum > 1) {
                        this.go();
                    }
                })
            },
        },
        created() {
            this.getUserInfo();
            this.getSystemInfo();
            this.shake();
        }
    });
</script>

<style lang="less">
    .container {
        background: #f9f1da;
        height: 100%;
    }
    .content {
        width: 100%;
        height: 300rpx;
        text-align: center;
        font-size: 60rpx;
        line-height: 300rpx;
        background: rgba(246, 200, 60, 0.5)
    }
    .btn {
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        margin: 100rpx auto;
        background: rgba(246, 200, 60);
        border: 4rpx solid #fff;
        border-radius: 8rpx;
    }
</style>

<config>
{
    navigationBarTitleText: '今天吃什么',
    navigationBarBackgroundColor: '#f9f1da',
    disableScroll: true,
    usingComponents: {
        topBar: '~@/components/topBar/index'
    }
}
</config>
