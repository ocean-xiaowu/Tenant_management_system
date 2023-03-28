<template>
    <div id="app">
        <el-button>点击</el-button>asdasdasd
    </div>
</template>
<script>
export default {
    data() {
        return {
            a: []
        }
    },
    methods: {
        aa() {
            let a = Array.apply(null, { length: 3 }).map(val => {
                return (this.a = val)
            })
            console.log(a)
        }
    }
}
</script>

<style scoped>
</style>