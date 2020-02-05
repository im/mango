const app = getApp()
const moment = require('../../utils/moment-with-locales');
const ncovUrl = 'https://api.tianapi.com/txapi/ncov/index?key=45fa3cbde8554285c1677e2ecc3168fd';
const ncovcityUrl = 'https://api.tianapi.com/txapi/ncovcity/index?key=45fa3cbde8554285c1677e2ecc3168fd'
Page({
    data: {
        navActive: 'broadcast',
        navs: [{
                name: '疫情地图',
                value: 'map'
            },
            {
                name: '实时播报',
                value: 'broadcast'
            },
            // {
            //     name: '谣言',
            //     value: 'rumour'
            // }
        ],
        case: [],
        news: [],
        desc: {},
        updateTime: '',
        durationTime: '',
        ncovcity: [],
        showCitys: {},
        loading: false,
        currentIndex: 1,
        swiperMap: {
            map: 0,
            broadcast: 1,
            rumour: 2
        },
        swiperMapOr: {
            0: 'map',
            1: 'broadcast',
            2: 'rumour'
        },
        clientHeight: 0
    },
    handleShowCity(e) {
        const city = e.currentTarget.dataset.city;
        const key = 'showCitys.' + city
        this.setData({
            [key]: !this.data.showCitys[city]
        })
    },
    handleNav(e) {
        const nav = e.currentTarget.dataset.nav;
        this.setData({
            navActive: nav
        })
    },
    setUpdateTime() {
        if (this.data.desc.modifyTime) {
            const modifyTime = moment(new Date(this.data.desc.modifyTime)).format(
                'YYYY-MM-DD HH:mm:ss'
            )
            this.setData({
                updateTime: modifyTime
            })
        }

    },
    setDurationTime() {
        if (this.data.desc.modifyTime) {
            const date1 = moment(new Date(), 'hh:mm')
            const date2 = moment(new Date(this.data.desc.modifyTime), 'hh:mm')
            const date3 = date2.diff(date1, 'minute')
            const durationTime = moment.duration(date3, 'minutes').locale('zh-cn').humanize(true) || '';
            this.setData({
                durationTime: durationTime
            })
        }

    },
    getNcov() {
        const self = this;
        wx.request({
            url: ncovUrl,
            success(res) {
                const data = res.data.newslist[0] || {};
                (data.news || []).forEach(item => {
                    item.pubDate = moment(new Date(item.pubDate)).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ) 
                })
                self.setData({
                    case: data.case || [],
                    news: data.news || [],
                    desc: data.desc
                })
                self.setUpdateTime();
                self.setDurationTime();
            }
        })
    },
    getNcovCity(flag) {
        const self = this;
        wx.request({
            url: ncovcityUrl,
            success(res) {
                const data = res.data.newslist || [];
                self.setData({
                    ncovcity: data,
                    loading: true
                })
                self.initShowCity()
                flag ? wx.stopPullDownRefresh() : wx.hideLoading()

            }
        })
    },
    initShowCity() {
        const cityJson = {}
        this.data.ncovcity.forEach(v => {
            cityJson[v.provinceShortName] = false
        })
        cityJson['湖北'] = true;
        this.setData({
            showCitys: cityJson
        })
    },
    getClientHeight() {
        const self = this;
        wx.getSystemInfo({
            success(res) {
                self.setData({
                    clientHeight: (res.windowHeight * 2) - 100
                })
            }
        })
    },
    swiperChange (e) {
        const current = e.detail.current;
        this.setData({
            navActive: this.data.swiperMapOr[current]
        })
        
    }, 
    onLoad() {
        wx.showLoading({
            title: '加载中...',
        })
        this.getClientHeight();
        this.getNcov();
        this.getNcovCity();
    },
    onPullDownRefresh() {
        this.getNcov();
        this.getNcovCity('downRefresh')
    },
    formatTimestamp (item) {
        console.log('item: ', item);

    }
})