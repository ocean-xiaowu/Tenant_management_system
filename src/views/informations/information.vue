<template>
    <div id="app"></div>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods: {
        aa() {
            var series = Object.keys(
                Array.apply(null, {
                    length: 10
                })
            ).map(function () {
                return {
                    name: '',
                    type: 'bar',
                    barGap: 0,
                    label: 1,
                    emphasis: {
                        focus: 'series'
                    }
                }
            })
        }
    },
    mounted() {
        this.aa()
    }
}
</script>

<style scoped></style>
