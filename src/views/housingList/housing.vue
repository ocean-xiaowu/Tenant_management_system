<template>
    <div id="app">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/homelist' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>房源管理</el-breadcrumb-item>
            <el-breadcrumb-item>房源列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片 -->
        <el-card>
            <el-button @click="aa">避免if过长正常写法</el-button>
            <el-button @click="bb">避免if过长简写</el-button>
            <el-button @click="cc">去重</el-button>
            <el-button @click="nowTime">时间</el-button>
            <el-button @click="every">every方法</el-button>
            <el-button @click="some">some方法</el-button>
            <el-button @click="tj">条件简写</el-button>
            <el-button @click="indexTest">字符串搜索</el-button>
            <el-button>store:{{sum}}</el-button>
            <el-button @click="handleAdd">+1</el-button>
            <el-button @click="subtract1">-1</el-button>
            <el-button @click="subtract2">Async+1</el-button>
            <el-button @click="quchong">新去重</el-button>
            <el-button @click="chuangjian">创建</el-button>
            <el-button @click="Each">forEachReturn</el-button>
            <el-divider></el-divider>
            <el-alert style="margin-top:2rem" title="错误提示的文案" type="error"></el-alert>
        </el-card>
        <!-- 卡片 -->
        <el-card style="margin-top:2rem">
            <el-button @click="jicheng">继承</el-button>
        </el-card>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            time: '1',
            TT: [],
            a: [1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1, 1, 1]
        }
    },
    methods: {
        ...mapMutations(['subtract']),
        handleAdd() {
            this.$store.commit('add', this.time)
        },
        subtract2() {
            this.$store.dispatch('add1', 20)
        },
        subtract1() {
            this.subtract(8)
        },
        // 多个条件成立正常写法
        aa() {
            let value = ['a', 'b', 'c']
            value.map((item, index) => {
                if (item == 'a' || item == 'b' || item == 'c') {
                    console.log(111)
                }
            })
        },
        // 多个条件成立简写
        bb() {
            let value = ['a', 'b', 'c']
            value.map((item, index) => {
                if (value.includes(item)) {
                    console.log('asdasd')
                }
            })
        },
        cc() {
            let dd = ['a', 'a', 'b', 'b', 'c', 'cc', 'd', 'dd']
            dd = Array.from(new Set(dd))
        },
        nowTime() {
            const now = new Date()
            const year = now.getFullYear()
            const month = now.getMonth()
            const date =
                now.getDate() >= 10 ? now.getDate() : '0' + now.getDate()
            const hour =
                now.getHours() >= 10 ? now.getHours() : '0' + now.getHours()
            const miu =
                now.getMinutes() >= 10
                    ? now.getMinutes()
                    : '0' + now.getMinutes()
            const sec =
                now.getSeconds() >= 10
                    ? now.getSeconds()
                    : '0' + now.getSeconds()
            this.time =
                +year +
                '年' +
                (month + 1) +
                '月' +
                date +
                '日 ' +
                hour +
                ':' +
                miu +
                ':' +
                sec
            console.log(this.time)
        },
        // 需要每一项都要通过条件返回true 否则返回false
        every() {
            const toto = [2, 4, 8, 10]
            let a = toto.every(val => val % 2 == 0)
            alert(a)
        },
        // 只需一项条件成立返回true 否则返回false
        some() {
            const toto = [1, 3, 7]
            let a = toto.some(val => val % 2 == 0)
            alert(a)
        },
        // 条件简写
        tj() {
            let a = true
            // 简写
            a && this.some()
            // if写法
            if (a) {
                this.some()
            }
        },
        // indexOf
        indexTest() {
            let arr = [1, 2, 3, 4, 1].toString()
            let arr1 = [1, 2, 3, 4, 1]
            // 判断字符串是否以某个指定的值开头返回布尔值  (startsWith)
            let a = arr.startsWith(1)
            // 判断字符串是否以某个指定的值结尾返回布尔值  (endsWith)
            let b = arr.endsWith(1)
            let v = new Array()
            let c = []
            console.log(v)
            console.log(c)
            let asa = Array.apply(null, { length: 6 }).map(() => {
                return 'asdas'
            })
            console.log(Array.isArray(arr))
        },
        quchong() {
            function quchong1(arr) {
                const newArr = []
                arr.reduce((pre, next) => {
                    console.log(pre, next)
                    if (!pre.get(next)) {
                        pre.set(next, 1)
                        newArr.push(next)
                    }
                    return pre
                }, new Map())
                console.log(newArr)
                return newArr
            }
            function quchong2(arr) {
                return [...new Set(arr)]
            }
            this.a = quchong1(this.a)
            console.log(this.a)
        },
        chuangjian() {
            // function get(url, fn) {
            //     const xhr = new XMLHttpRequest()
            //     xhr.open('GET', url, true)
            //     xhr.onreadystatechange = function () {
            //         if (xhr.readyState === 4) {
            //             fn(xhr.responseText)
            //         }
            //     }
            //     xhr.send()
            // }
            // function post(url, fn) {
            //     const xhr = new XMLHttpRequest()
            //     xhr.open('POST', url, true)
            //     xhr.setRequestHeader(
            //         'Content-type',
            //         'application/x-www-from-urlencoded'
            //     )
            //     xhr.onreadystatechange = function () {
            //         if (readyState === 4) {
            //             fn(xhr.responseText)
            //         }
            //     }
            //     xhr.send(data)
            // }
            let a = 100
            if (1) {
                a = 10
                //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
                // 而这时，还未到声明时候，所以控制台Error:Cannot access 'a' before initialization
                let a = 1
            }
        },
        // forEach  return会继续执行
        Each() {
            let arr = [2, 2, 3, 4]

            arr.some((item, index) => {
                if (item === 2) {
                    return console.log(item, index)
                }
            })
        }
    },
    methods: {
        jicheng() {
            function Parent() {
                Child.call(this)
                this.name = 'parent'
            }
            function Child() {
                // Parent.call(this)
                this.type = 'child'
                this.timer = '100'
                this.play = [1, 2, 3]
            }
            Child.prototype = new Parent()
            const s1 = new Child()
            const s2 = new Child()
            s1.play.push('1')
            console.log(s1, s2)
        }
    },
    computed: {
        ...mapState(['sum'])
    }
}
</script>

<style scoped>
.el-breadcrumb {
    margin-left: 5px;
    margin-bottom: 12px;
}
</style>
