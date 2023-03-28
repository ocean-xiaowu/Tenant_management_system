<template>
    <div id="app">
        <el-card>
            <!-- 搜索框 -->
            <el-row>
                <el-col :span="8">
                    <el-input class="width:95%">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="addCasa">添加房屋</el-button>
                </el-col>
            </el-row>
            <!-- 表 -->
            <el-tabs>
                <el-tab-pane v-for="item in CasaNames" :key="item.id" :label="item.lable" :value="item.id">
                    <el-button class="addTenant" type="info" @click="AddTenant">新增房客</el-button>
                    <!-- 表格 -->
                    <el-table :data="userData" border stripe>
                        <el-table-column label="#" type="index"></el-table-column>
                        <el-table-column prop="roomNumber" label="房号" width="80"></el-table-column>
                        <el-table-column prop="host" label="户主姓名" width="100"></el-table-column>
                        <el-table-column prop="dateTime" label="入住日期" width="130"></el-table-column>
                        <el-table-column prop="leaveTime" label="离开日期" width="130"></el-table-column>
                        <el-table-column prop="status" label="状态" width="140">
                            <template slot-scope="scope">
                                <span class="status">未租</span>
                                <el-switch v-model="scope.row.status" @change="userStateChange(scope.row)"></el-switch>
                                <span class="status">已租</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column prop="identity" label="身份证号"></el-table-column>
                        <el-table-column label="操作" width="230px">
                            <template slot-scope="scope">
                                <!-- 修改按钮 -->
                                <el-button type="primary" icon="el-icon-edit" size="mini" @click="alterUser(scope.row.roomNumber)"></el-button>
                                <!-- 新增家属按钮 -->
                                <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addRelation"></el-button>
                                <!-- 删除按钮 -->
                                <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleCasa"></el-button>
                                <!-- 查看人员信息 -->
                                <el-tooltip effect="dark" content="查看" placement="top" :enterable="false"></el-tooltip>
                                <el-popover placement="left" width="320">
                                    <p class="examineP" @click="examineAll">查看人员信息</p>
                                    <p class="examineP">查看合同信息</p>
                                    <el-button slot="reference" type="warning" icon="el-icon-setting" size="mini"></el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 添加房屋弹框 -->
        <el-dialog title="新增房屋(房屋的地址或者名称)" :visible.sync="addCasaDialog" @close="addCasaDialogClose" class="el-dialog--center">
            <el-form :model="addCasaForm" :rules="addCasaRules" ref="addCasaRef">
                <el-form-item label="房屋名称" label-width="120px" prop="CasaName">
                    <el-input v-model="addCasaForm.CasaName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitAddCasa">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加家属弹框 -->
        <addRelationDialog ref="Relation"></addRelationDialog>
        <!-- 添加房客弹框 -->
        <addTenantDialog ref="Tenant"></addTenantDialog>
        <!-- 查看弹框 -->
        <examineDialog ref="examine"></examineDialog>
    </div>
</template>

<script>
import addTenantDialog from './listDialog/addTenantDialog.vue'
import addRelationDialog from './listDialog/addRelationDialog.vue'
import examineDialog from './listDialog/examineDialog.vue'
export default {
    data() {
        return {
            addCasaDialog: false,
            // 校验规则
            addCasaRules: {
                CasaName: [
                    {
                        required: true,
                        message: '请输入房屋名称',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 12,
                        message: '长度在 6 到 12 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            //表单绑定数据
            addCasaForm: {
                CasaName: ''
            },
            // 房屋数据
            CasaNames: [
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
            ],
            // 用户信息
            userData: [
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
            ]
        }
    },
    methods: {
        // 改变状态
        alterUser(e) {
            console.log(e)
            this.userData.map(val => {
                if (val.roomNumber == e) val.status = !val.status
            })
            console.log(this.userData)
        },
        // 取消
        cancel() {
            this.addCasaDialog = false
        },
        // 新增房屋弹框
        addCasa() {
            this.addCasaDialog = true
        },
        // 提交新增房屋
        submitAddCasa() {
            // 对整个表单进行校验
            this.$refs.addCasaRef.validate(vali => {
                if (vali) {
                    this.CasaNames.push({
                        id: Math.random() * 100,
                        lable: this.addCasaForm.CasaName
                    })
                    this.addCasaDialog = false
                    this.$message.success('添加成功')
                } else {
                    this.$message.error('请正确的填写表中的信息！')
                }
            })
            this.CasaNames
            debugger
        },
        // 新增房客
        AddTenant() {
            this.$refs.Tenant.addTenantDialog = true
        },
        // 监听对话框关闭
        addCasaDialogClose() {
            this.$refs.addCasaRef.resetFields()
        },
        // 添加家属弹框
        addRelation() {
            this.$refs.Relation.RelationDialog = true
        },
        //删除房屋
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
        // 查看人员信息
        examineAll() {
            this.$refs.examine.dialogExamineple = true
        },
        // 用户状态
        userStateChange() {}
        // 切换楼栋
    },
    components: {
        addRelationDialog,
        addTenantDialog,
        examineDialog
    }
}
</script>

<style scoped>
.examineP {
    margin-bottom: 10px;
    line-height: 50px;
    width: 100%;
    font-weight: 600;
    text-align: center;
    font-size: 24px;
    height: 50px;
    background: #eee;
    cursor: pointer;
}
.el-button--danger {
    margin-right: 10px;
}
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
.addTenant {
    float: right;
    margin-bottom: 15px;
}
.status {
    display: inline-block;
    margin-right: 5px;
    margin-left: 5px;
}
.el-pagination {
    margin-top: 20px;
    text-align: right;
}
</style>
