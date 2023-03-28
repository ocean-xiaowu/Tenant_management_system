<template>
    <div id="app">
        <div class="LoginLeft">
            <div class="stimulate">{{title}}</div>
        </div>
        <div class="LoginRight">
            <div class="Loginbox box">
                <h3 class="dom" ref="dom">望安心公寓后台管理系统</h3>
                <el-form :model="login">
                    <el-form-item>
                        <el-input v-model="Login.AccountN" placeholder="请输入账号">
                            <i slot="prefix" class="el-input__icon el-icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="Login.passWord" placeholder="请输入密码">
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="rememberMe"></el-checkbox>
                        <span style="font-size:12px;margin-left:5px">记住密码</span>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="Login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 记住我
            rememberMe: false,
            // 账号密码
            login: {
                AccountN: '',
                passWord: ''
            },
            timer: 0,
            title1: '',
            i: 0,
            title: ''
        }
    },
    mounted() {
        this.typing()
    },
    methods: {
        Login() {
            this.$router.push({
                name: 'home'
            })
        },
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
        }
    }
}
</script>

<style scoped>
#app {
    width: 100%;
    height: 100%;
    display: flex;
}
.stimulate {
    margin-top: 200px;
    margin-left: 50px;
    width: 600px;
    height: 50px;
    font-size: 40px;
    color: #fff;
}
.LoginLeft {
    background-image: url('../assets/loginbg.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 65%;
    height: 100%;
    position: relative;
}
.LoginRight {
    position: relative;
    width: 35%;
    height: 100%;
}
.Loginbox {
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px;
    width: 60%;
    text-align: center;
}
h3 {
    margin-bottom: 20px;
    font-size: 20px;
    font-family: PingFang;
    line-height: 50px;
    color: #161616;
    opacity: 0.8;
    text-align: center;
}
::v-deep .el-input__inner {
    height: 33px;
}
.el-button {
    border-radius: 20px;
    width: 200px;
}
::v-deep .el-input {
    width: 75%;
}
.Loginbox::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    box-shadow: inset 0 0 0 2px rgba(10, 110, 120, 0.5);
    /*内阴影 inset*/
    left: 0;
    top: 0;
    margin: -10px;
    /* clip: rect(0px,220px,2px,0px);
    clip: rect(0px,2px,220px,0px);
    clip: rect(218px,220px,220px,0px);
    clip: rect(0px,220px,220px,218px); */
    animation: aaa 5s linear infinite;
}

@keyframes aaa {
    0%,
    100% {
        clip: rect(0px, 500px, 2px, 0px);
    }
    25% {
        clip: rect(0px, 2px, 500px, 0px);
    }
    50% {
        clip: rect(498px, 500px, 500px, 0px);
    }
    75% {
        clip: rect(0px, 500px, 500px, 498px);
    }
}
</style>
