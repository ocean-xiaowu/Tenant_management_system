<template>
    <div id="app">
        <el-dialog title="人员信息(家庭成员以及户主)" :visible.sync="dialogExamineple" width="80%" class="el-dialog--center">
            <el-table :data="userDataAll" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="roomNumber" label="房号" width="80"></el-table-column>
                <el-table-column prop="userName" label="姓名" width="100"></el-table-column>
                <el-table-column prop="relation" label="与户主的关系" width="120"></el-table-column>
                <el-table-column prop="checkInTime" label="入住时间" width="100"></el-table-column>
                <el-table-column prop="leaveTime" label="离开时间" width="100"></el-table-column>
                <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
                <el-table-column prop="address" label="家庭住址"></el-table-column>
                <el-table-column prop="jobAddress" label="工作地址"></el-table-column>
                <el-table-column prop="identity" label="身份证号"></el-table-column>
                <el-table-column label="操作" width="150px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="changeInfo(scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleCasa"></el-button>
                    </template>
                </el-table-column>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogExamineple = false">取 消</el-button>
                    <el-button type="primary" @click="dialogExamineple = false">确 定</el-button>
                </div>
            </el-table>
        </el-dialog>
        <!-- 修改弹框 -->
        <el-dialog title="修改信息" :visible.sync="amendTenantDialog" class="el-dialog--center">
            <el-form :model="amendForm">
                <el-form-item label="房间号" label-width="120px">
                    <el-input v-model="amendForm.roomNumber" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="120px">
                    <el-input v-model="amendForm.userName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="身份证" label-width="120px">
                    <el-input v-model="amendForm.identity" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="与户主的关系" label-width="120px" prop="Relation">
                    <el-select v-model="amendForm.relation" placeholder="请选择与户主的关系">
                        <el-option v-for="item in RelationData" :label="item.lable" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电话号码" label-width="120px">
                    <el-input v-model="amendForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入住时间" label-width="120px" prop="datetime">
                    <el-date-picker v-model="amendForm.checkInTime" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="离开时间" label-width="120px" prop="leaveTime">
                    <el-date-picker v-model="amendForm.leaveTime" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="家庭住址" label-width="120px">
                    <el-cascader v-model="amendForm.address" :options="options"></el-cascader>
                </el-form-item>
                <el-form-item label="工作地址" label-width="120px">
                    <el-input v-model="amendForm.jobAddress" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="amendTenant">取 消</el-button>
                <el-button type="primary" @click="amendTenant">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 地址json
import Addressdata from '../../../plugins/pcas-code.json'
// 关系json
import RelationData from '../../../plugins/Relation.json'
export default {
    data() {
        return {
            options: Addressdata,
            RelationData: RelationData,
            amendForm: {},
            userDataAll: [
                {
                    roomNumber: '101',
                    checkInTime: '2021/8/13',
                    leaveTime: '2021/12/13',
                    userName: '张三',
                    relation: '父子',
                    mobile: '123456789',
                    jobAddress: '深圳',
                    address: ['11', '1101', '110101', '110101001'],
                    identity: '3408*******8888'
                }
            ],
            dialogExamineple: false,
            amendTenantDialog: false,
            detailData: []
        }
    },
    methods: {
        //删除房客
        DeleCasa() {
            this.$confirm('此操作将永久删除该房客, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    })
                })
                .catch(() => {
                    this.$notify.info({
                        title: '取消',
                        message: '以取消删除'
                    })
                })
        },
        changeInfo(e) {
            this.amendForm = e
            this.amendTenantDialog = true
        },
        amendTenant() {
            console.log(this.amendForm)
        }
    }
}
</script>

<style scoped>
.el-input,
.el-cascader,
.el-select {
    width: 95%;
}
</style>