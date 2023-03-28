<template>
    <div id="app">
        <div id="main" ref="main" style="width: 465px;height:250px;"></div>
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
                    text: '收入详情'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        '一月',
                        '二月',
                        '三月',
                        '四月',
                        '五月',
                        '六月',
                        '七月',
                        '八月',
                        '九月',
                        '十月',
                        '十一月',
                        '十二月'
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '四海公寓',
                        type: 'line',
                        stack: '总量',
                        data: [
                            7500, 7800, 6600, 7400, 7770, 6400, 7300, 7100,
                            7100, 7100, 7100, 7100
                        ]
                    },
                    {
                        name: '潭头',
                        type: 'line',
                        stack: '总量',
                        data: [
                            5500, 6800, 5600, 5400, 6770, 6400, 6300, 6100,
                            6100, 6100, 6100, 6100
                        ]
                    },
                    {
                        name: '永康街19号',
                        type: 'line',
                        stack: '总量',
                        data: [
                            2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500,
                            2500, 2500, 2500, 2500
                        ]
                    },
                    {
                        name: '万丰大厦',
                        type: 'line',
                        stack: '总量',
                        data: [
                            2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500,
                            2500, 2500, 2500, 2500
                        ]
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
