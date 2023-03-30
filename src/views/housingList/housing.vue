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
            <el-button @click="assign">Object.assign</el-button>
            <el-button @click="keys">Object.keys</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
      assign(){
        const a = {a:1}
        const b = {b:2}
        const c = {c:3,d:4}
        const e = {f:3,g:4}
        // 对象的合并
        Object.assign(a,b,c,e)
        console.log(a);
      },
      keys(){
        const c = {c:3,d:4}
        let arr = Object.keys(c)
        console.log(arr);
      }
    }
}
</script>

<style scoped>
.el-breadcrumb {
    margin-left: 5px;
    margin-bottom: 12px;
}
</style>
