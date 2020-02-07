

<template>
    <div class="header">
        <image class="avatar"  v-if="userInfo.avatarUrl" src="{{ userInfo.avatarUrl }}"/>
        <!-- <div class="nickname">{{ userInfo.nickName }}</div> -->
    </div>
</template>

<script>
    import wepy from '@wepy/core'
    import {
        mapState
    } from '@wepy/x';
    import store from '../../store';
    wepy.component({
        store,
        props: {
            gitem: {}
        },
        data: {},
        computed: {
            // userInfo () {
            //     return this.$store
            // }
            ...mapState([
                'userInfo'
            ])
        },
        methods: {

        }
    });
</script>
<style type="less">
.header {
    width: 100%;
    height: 100rpx;
    padding: 20rpx;
    text-align: center;
}
.avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}
</style>
