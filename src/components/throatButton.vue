<template>
    <!-- 节流按钮 -->
    <el-button v-bind="$attrs" v-on="evet" :disabled="disabled">
        <slot></slot>
    </el-button>
</template>
<script>
export default {
    name: 'throat-btn',
    computed: {
        evet() {
            if (this.$listeners.click) {
                this.$listeners.click = this.throat('click')
            }
            return this.$listeners
        },
        disabled() {
            if (this.timer) {
                return true
            } else {
                return false
            }
        }
    },
    data() {
        return {
            timer: null
        }
    },
    methods: {
        throat(method) {
            const me = this
            return (...args) => {
                if (!me.timer) {
                    me.$emit(method, ...args)
                    me.timer = setTimeout(() => {
                        me.timer = null
                    }, me.$attrs.throat || 3000) //默认5s的，节流
                } else {
                    me.$emit('droped', ...args) //点击太频繁的事件提示
                }
            }
        }
    }
}
</script>