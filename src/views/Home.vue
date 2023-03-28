<template>
    <div id="app">
        <el-container class="home-container">
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- logo -->
                <div class="logo" @click="goHome">
                    <img src="../assets/logo.png" alt style="width:60px;margin-top:15px" />
                </div>
                <!-- 导航栏 -->
                <div>
                    <el-menu :default-active="activePath" :collapse="isCollapse" :collapse-transition="false" router unique-opened>
                        <el-submenu :index="item.id + ''" v-for="item in asideData" :key="item.id">
                            <template slot="title">
                                <i :class="asideIcont[item.id]" style="margin-right:5px"></i>
                                <span>{{ item.authName }}</span>
                            </template>
                            <el-menu-item :index="'/' + val.path" v-for="val in item.children" :key="val.id" @click="saveNavState('/' + val.path, val)">
                                <template slot="title">
                                    <i :class="asideIcont[val.id]" style="margin-right:5px"></i>
                                    <span>{{ val.authName }}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-aside>
            <el-container>
                <el-header class="home-header">
                    <div class="headerLeft">
                        <i class="iconfont icon-zhankai" @click="toggleCollapse"></i>
                        <i class="el-icon-full-screen" @click="screen"></i>
                        <i class="el-icon-bell" @click="dispose"></i>
                    </div>
                    <div class="headerMessage">
                        <!-- 励志句 -->
                        <div class="stimulate" :title="title">{{title}}</div>
                    </div>
                    <!-- 用户 -->
                    <div class="headerUser">
                        <el-menu class="el-menu-demo" mode="horizontal">
                            <el-submenu style="line-height: 80px" index="2">
                                <template slot="title">{{UserName}}</template>
                                <el-menu-item @click="personalInfo" index="2-2">个人中心</el-menu-item>
                                <el-menu-item index="2-1" @click="changePassWord">修改密码</el-menu-item>
                                <el-menu-item index="2-2">待办事务</el-menu-item>
                                <el-menu-item index="2-3" @click="quit">退出</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-header>
                <el-main>
                    <commonTag :pathData="pathTag" ref="commonTag"></commonTag>
                    <transition name="el-fade-in-linear">
                        <router-view v-if="bool" v-loading="loading"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
        <!-- 修改密码弹框 -->
        <el-drawer title="修改密码" :visible.sync="drawer" size="20%" :modal-append-to-body="false" style="height:100%;top:80px">
            <el-form :model="newPassWord" :rules="editPassRule" ref="newPassWordRef">
                <el-form-item label label-width="40px" prop="oldPassWord">
                    <el-input v-model="newPassWord.oldPassWord" placeholder="原密码"></el-input>
                </el-form-item>
                <el-form-item label label-width="40px" prop="newPass">
                    <el-input show-password v-model="newPassWord.newPass" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item label label-width="40px" prop="againNewPass">
                    <el-input show-password v-model="newPassWord.againNewPass" placeholder="重复新密码"></el-input>
                </el-form-item>
            </el-form>
            <el-button style="margin-left:40px" type="primary">确定</el-button>
            <el-button @click="cencel" type="info">取消</el-button>
        </el-drawer>
    </div>
</template>

<script>
import commonTag from './components/commonTag.vue'
import screenfull from 'screenfull'
export default {
    // 注册子组件
    components: {
        commonTag
    },
    data() {
        // 校验规则
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.newPassWord.againNewPass !== '') {
                    this.$refs.newPassWordRef.validateField('againNewPass')
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value == this.newPassWord.newPass) {
                this.$notify({
                    title: '警告',
                    message: '不能输入相同的密码',
                    type: 'warning',
                    position: 'top-left'
                })
            } else {
                callback()
            }
        }
        var validatePass1 = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('原密码为空'))
            }
            callback()
        }
        return {
            // 全屏
            screenfull: false,
            // 新密码
            newPassWord: {
                oldPassWord: '',
                newPass: '',
                againNewPass: ''
            },
            //修改密码
            drawer: false,
            activePath: '',
            isCollapse: false,
            // 用户名
            UserName: 'ocean',
            // 头像地址
            UserUrl:
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            arr: ['1', '2', '3', '4'],
            // 导航栏数据
            asideData: [
                {
                    id: '100',
                    authName: '首页',
                    children: [
                        {
                            id: '99',
                            authName: '首页详情',
                            path: 'homelist'
                        }
                    ]
                },
                {
                    id: '101',
                    authName: '用户管理',
                    children: [
                        {
                            authName: '用户列表',
                            id: '107',
                            order: null,
                            path: 'users'
                        }
                    ]
                },
                {
                    id: '201',
                    authName: '权限管理',
                    children: [
                        {
                            id: '202',
                            authName: '权限管理',
                            order: null,
                            path: 'rightadm'
                        },
                        {
                            id: '203',
                            authName: '权限列表',
                            order: null,
                            path: 'rightList'
                        }
                    ]
                },
                {
                    id: '102',
                    authName: '房屋管理',
                    children: [
                        {
                            authName: '房屋列表',
                            id: '108',
                            order: null,
                            path: 'houses'
                        },
                        {
                            authName: '房租明细',
                            id: '109',
                            order: null,
                            path: 'rents'
                        },
                        {
                            authName: '水电明细',
                            id: '110',
                            order: null,
                            path: 'waandel'
                        }
                    ]
                },
                {
                    id: '103',
                    authName: '楼栋管理',
                    children: [
                        {
                            authName: '楼栋列表',
                            id: '112',
                            order: null,
                            path: 'building'
                        },
                        {
                            authName: '楼栋详情',
                            id: '113',
                            order: null,
                            path: 'buidetail'
                        }
                    ]
                },
                {
                    id: '104',
                    authName: '信息申报',
                    children: [
                        {
                            authName: '房客信息申报',
                            id: '113',
                            order: null,
                            path: 'information'
                        }
                    ]
                },
                { id: '105', authName: '维修申报', path: 'users' },
                {
                    id: '106',
                    authName: '房源管理',
                    children: [
                        {
                            authName: '房源列表',
                            id: '102',
                            order: null,
                            path: 'housinglist'
                        }
                    ]
                }
            ],
            // 动态图标
            asideIcont: {
                99: 'iconfont icon-xiangqing',
                100: 'iconfont icon-shujuzhanshi',
                101: 'iconfont icon-users',
                102: 'iconfont icon-fangwu',
                103: 'iconfont icon-loudongguanli',
                104: 'iconfont icon-fenxi',
                105: 'iconfont icon-weixiu',
                106: 'iconfont icon-fangyuan',
                107: 'iconfont icon-shujuzhanshi',
                108: 'iconfont icon-shujuzhanshi',
                109: 'iconfont icon-fangzu',
                110: 'iconfont icon-shuidianbiaochaobiao',
                112: 'iconfont icon-chazhaobiaodanliebiao',
                113: 'iconfont icon-xiangqing',
                201: 'el-icon-s-ticket',
                202: 'el-icon-tickets',
                203: 'el-icon-receiving'
            },
            // 校验规则
            editPassRule: {
                oldPassWord: [{ validator: validatePass1, trigger: 'blur' }],
                newPass: [{ validator: validatePass, trigger: 'blur' }],
                againNewPass: [{ validator: validatePass2, trigger: 'blur' }]
            },
            timer: 0,
            title1: '',
            i: 0,
            title: '',
            bool: false,
            pathTag: [],
            loading: true
        }
    },
    methods: {
        // 跳转个人信息
        personalInfo() {
            this.$router.push({
                name: 'roomInformation'
            })
        },
        // 打字机
        typing() {
            let aa = '人生最要紧的不是你站在什么地方,而是你朝什么方向走！'
            if (this.i <= aa.length) {
                this.title = aa.slice(0, this.i++) + '_'
                this.timer = setTimeout(() => {
                    this.typing()
                }, 100)
            } else {
                clearInterval(this.timer)
            }
        },
        // 点击按钮，左侧栏收起与展开
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        handleClick() {},
        // 退出登录
        quit() {
            this.$router.push({
                name: 'login'
            })
        },
        // 保存状态
        saveNavState(activePath, e) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1000)
            this.bool = true
            this.$store.commit('mutationSelectTags', e)
            sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        },
        // 修改密码
        changePassWord() {
            this.drawer = true
        },
        // 取消更改密码
        cencel() {
            this.$refs.newPassWordRef.resetFields()
            this.drawer = false
        },
        // 回到首页
        goHome() {
            this.$router.push({
                name: 'home'
            })
        },
        // 点击全屏
        screen() {
            screenfull.toggle()
            if (!screenfull.isFullscreen) {
                this.$notify({
                    title: '成功',
                    message: '现在为全屏状态',
                    type: 'success'
                })
            } else {
                this.$notify.info({
                    title: '成功',
                    message: '退出全屏',
                    type: 'success'
                })
            }
        },
        dispose() {}
    },
    created() {
        let activePath = sessionStorage.getItem('activePath')
        this.activePath = activePath
    },
    mounted() {
        this.typing()
    }
}
</script>

<style scoped>
.el-menu {
    text-align: left;
}
.el-icon-search {
    margin-left: 10px;
    font-size: 30px;
}
.el-icon-arrow-down {
    font-weight: 800;
    font-size: 14px;
    margin-left: 5px;
}
.headerMessage {
    flex: 3;
}
.home-header {
    display: flex;
}
.headerLeft {
    flex: 4;
}
.headerUser {
    display: flex;
    flex: 1;
}
.UserPt {
    flex: 1;
}
.UserName {
    flex: 2;
    width: 150px;
}
.home-container {
    height: 100%;
}
.logo {
    height: 80px;
    background: skyblue;
}
.el-header {
    background-color: #373d41;
    color: #fff;
    text-align: center;
    display: flex;
    height: 80px !important;
    line-height: 80px;
}
.el-aside {
    color: #333;
    text-align: center;
}
.el-avatar {
    margin-top: 25px;
}
.el-input {
    width: 90%;
}
.el-header {
    text-align: left;
}
::v-deep .el-main {
    padding: 5px, 10px;
}
.el-icon-full-screen,
.el-icon-bell {
    margin-left: 15px;
}
.User {
    display: inline-block;
    font-size: 18px;
}
.el-header {
    background-color: skyblue;
}
::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title {
    line-height: 80px;
    height: 80px;
    background-color: skyblue;
}
::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title {
    font-size: 22px;
}
</style>