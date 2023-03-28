<template>
    <div id="app">
        <!-- 一分四 -->
        <el-row>
            <el-col :span="8">
                <el-card class="headCard">
                    <p class="earning">2021年8月收入</p>
                    <span class="coin">
                        <i class="el-icon-coin"></i>
                    </span>
                    <span class="income">{{income}}</span>
                    <span class="income">
                        <i class="el-icon-top"></i>
                    </span>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="headCard1">
                    <p class="earning">空房数量</p>
                    <span class="coin">
                        <i class="iconfont icon-fangwu custom"></i>
                    </span>
                    <span class="income">{{emptyRoom}}</span>
                    <span class="income">
                        <i class="el-icon-top"></i>
                    </span>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="headCard2">
                    <p class="earning">房客数量</p>
                    <span class="coin">
                        <i class="el-icon-s-custom"></i>
                    </span>
                    <span class="income">{{tenant}}</span>
                    <span class="income">
                        <i class="el-icon-top"></i>
                    </span>
                </el-card>
            </el-col>
        </el-row>
        <!-- 一分二 -->
        <el-row>
            <el-col :span="8">
                <!-- echars -->
                <el-card class="third">
                    <Distribution></Distribution>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="third">
                    <Earning></Earning>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="third"></el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-card class="third"></el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="third"></el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="third"></el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Earning from '../views/casa/echars/earningEchar.vue'
import Distribution from '../views/casa/echars/distributionEchar.vue'
export default {
    components: {
        Distribution,
        Earning
    },
    data() {
        return {
            income: '19980￥',
            emptyRoom: '10' + ' ' + '间',
            tenant: '261' + ' ' + '人'
        }
    },
    mounted() {}
}
</script>

<style scope>
.third {
    margin-top: 25px;
    width: 90%;
    height: 260px;
}
.headCard {
    background: #55efc4;
    width: 90%;
    height: 100px;
}
.headCard1 {
    background: #00b894;
    width: 90%;
    height: 100px;
}
.headCard2 {
    background: #45aaf2;
    width: 90%;
    height: 100px;
}
.headCard3 {
    background: #32ff7e;
    width: 90%;
    height: 100px;
}
.el-icon-coin,
.el-icon-s-custom {
    margin-top: 10px;
    font-size: 32px;
    color: #fff;
}
.coin {
    display: inline-block;
    margin-left: 50px;
}
.income {
    color: #fff;
    display: inline-block;
    margin-left: 20px;
    font-size: 30px;
}
.earning {
    font-size: 18px;
    color: #fff;
}
.custom {
    font-size: 28px;
    color: #fff;
}
</style>
