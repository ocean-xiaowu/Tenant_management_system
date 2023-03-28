<template>
    <div id="app">
        <!-- 卡片 -->
        <el-card>
            <!-- 搜索框 -->
            <el-row>
                <el-col :span="8">
                    <el-input class="width:95%">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- tab -->
            <el-tabs>
                <el-tab-pane v-for="item in CasaNames" :key="item.id" :label="item.lable" :value="item.id">
                    <el-table :data="userData" border style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column label="#" type="index"></el-table-column>
                        <el-table-column prop="roomNumber" label="房号"></el-table-column>
                        <el-table-column prop="host" label="户主姓名"></el-table-column>
                        <el-table-column prop="dateTime" label="入住日期"></el-table-column>
                        <el-table-column prop="leaveTime" label="离开日期"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                    </el-table>
                    <el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 房屋数据(死数据不需要响应式 使用Object.freeze)
            CasaNames: Object.freeze([
                {
                    id: '001',
                    lable: '万丰大厦'
                },
                {
                    id: '002',
                    lable: '四海公寓'
                },
                {
                    id: '003',
                    lable: '永康街19号'
                },
                {
                    id: '004',
                    lable: '潭头'
                }
            ]),
            // 用户信息
            userData: Object.freeze([
                {
                    roomNumber: '101',
                    dateTime: '2021/8/13',
                    leaveTime: '2021/12/13',
                    host: '张三',
                    mobile: '17681326521',
                    address: '安徽省安庆市望江县雷池乡双新村',
                    identity: '348**********1019',
                    status: true
                },
                {
                    roomNumber: '102',
                    dateTime: '2021/8/13',
                    leaveTime: '2021/12/13',
                    host: '李四',
                    mobile: '17681326521',
                    address: '安徽省安庆市望江县雷池乡双新村',
                    identity: '348**********1019',
                    status: true
                }
            ])
        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            console.log(row)
        }
    }
}
</script>
<style scoped>
.el-breadcrumb {
    margin-left: 5px;
    margin-bottom: 12px;
}
.el-input {
    width: 90%;
}
.el-tabs {
    margin-top: 20px;
}
.el-pagination {
    margin-top: 20px;
    text-align: right;
}
</style>
