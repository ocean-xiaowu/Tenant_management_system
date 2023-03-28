<template>
    <div id="app">
        <div id="main" ref="main" style="width: 480px;height:250px;"></div>
    </div>
</template>
<script>
export default {
    name: 'app',
    methods: {
        drawChart() {
            // 基于准备好的dom，初始化echarts实例
            let distribution = this.$echarts.init(this.$refs.main)
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: '出租屋人员分布',
                    left: 'right'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '78%',
                        data: [
                            { value: 1048, name: '四川' },
                            { value: 735, name: '广西' },
                            { value: 580, name: '安徽' },
                            { value: 484, name: '重庆' },
                            { value: 300, name: '河南' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            distribution.setOption(option)
        }
    },
    mounted() {
        this.drawChart()
    }
}
</script>

<style scope></style>
