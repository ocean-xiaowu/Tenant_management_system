
<template>
    <div class="app-tag">
        <div class="tag-box" v-if="tags.length !== 0">
            <el-tag closable v-for="(tag,index) in tags" :key="tag.authName" :disable-transitions="true" :effect="$route.path === '/' + tag.path ?'dark':'plain'" @close="handleClose(tag,index)" @click="handleClick(tag)">{{tag.authName}}</el-tag>
            <strong class="closeAll" @click="allClose">x</strong>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            tags: []
        }
    },
    created() {
        //stateTagsList是state.js中的存放tags数组的key，stateTagsList的值默认为空数组
        this.tags = this.stateTagsList
    },

    computed: {
        ...mapState(['stateTagsList'])
    },
    methods: {
        ...mapMutations({
            close: 'mutationCloseTag',
            allClose: 'mutationAllCloseTag'
        }),
        allClose() {},
        handleClose(tag, index) {
            if (this.tags.length === 1) {
                // 如果只有一个标签则不能关闭
                this.$message.info('最后一个标签啦,不许删 ^_^!')
                return
            }
            this.close(tag) // 删除当前tag
            if (this.$router.path === tag.path) {
                // 如果关闭的标签不是当前路由的话，不做路由跳转
                return
            } else {
                if (index === this.tags.length - 1) {
                    // 关闭最后一个标签,则路由跳转至最后一个
                    this.$router.push(this.tags[index].path)
                } else {
                    // 路由跳转至下一个标签页
                    if (index === 0) {
                        this.$router.push(this.tags[0].path)
                    } else {
                        this.$router.push(this.tags[index - 1].path)
                    }
                }
            }
        },
        // 点击tags具体标签
        handleClick(tag) {
            console.log(tag)

            this.$router.push({
                name: tag.path
            })
        }
    }
}
</script>
<style scoped>
.tag-box {
    padding: 5px;
    border: 1px solid #eee;
    margin-bottom: 5px;
}
.el-tag--plain {
    background-color: #fff;
    border-color: #eee;
    color: skyblue;
    margin-right: 4px;
}
.el-tag--dark {
    background-color: skyblue;
    border-color: skyblue;
    margin-right: 4px;
}
.closeAll {
    color: skyblue;
    margin-left: 5px;
    cursor: pointer;
}
</style>
