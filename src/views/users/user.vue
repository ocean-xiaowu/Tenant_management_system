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
                <el-col :span="4">
                    <el-button type="primary" @click="addUser">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="userlist" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template>
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 新增用户弹框 -->
        <el-dialog title="新增用户" :visible.sync="addUserDialog" @close="addDialogClose" class="el-dialog--center">
            <el-form :model="addUserForm" :rules="addUserRules" ref="addUserRef">
                <el-form-item label="用户名称" label-width="120px" prop="userName">
                    <el-input v-model="addUserForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" label-width="120px" prop="passWord">
                    <el-input v-model="addUserForm.passWord"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" label-width="120px" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" label-width="120px" prop="Fnumber">
                    <el-input v-model="addUserForm.Fnumber"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEamil =
                /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

            if (regEamil.test(value)) {
                return cb()
            }

            cb(new Error('请输入正确的邮箱'))
        }
        // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regMobile =
                /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

            if (regMobile.test(value)) {
                return cb()
            }

            cb(new Error('请输入正确的手机号'))
        }
        return {
            addUserDialog: false,
            addUserForm: {
                userName: '',
                passWord: '',
                email: '',
                Fnumber: ''
            },
            //   校验规则
            addUserRules: {
                userName: [
                    {
                        required: true,
                        message: '请输入用户名称',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 12,
                        message: '长度在 2 到 12 个字符',
                        trigger: 'blur'
                    }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 15,
                        message: '用户名的长度在6~15个字符之间',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入用户邮箱',
                        trigger: 'blur'
                    },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                Fnumber: [
                    { required: true, message: '请输入手机', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ]
            },
            // 表格数据
            userlist: [
                {
                    email: 'adsfad@qq.com',
                    id: 500,
                    mg_state: true,
                    mobile: '12345678',
                    role_name: '超级管理员',
                    username: 'admin'
                },
                {
                    email: 'adsfad@qq.com',
                    id: 501,
                    mg_state: true,
                    mobile: '12345678',
                    role_name: '测试',
                    username: 'cheshi'
                }
            ]
        }
    },
    methods: {
        addUser() {
            this.addUserDialog = true
        },
        addDialogClose() {
            this.$refs.addUserRef.resetFields()
        },
        // 提交添加
        submitAdd() {
            // 对整个表单进行校验
            this.$refs.addUserRef.validate(vali => {
                if (vali) {
                    this.addUserDialog = false
                    this.userlist.push({
                        email: this.addUserForm.email,
                        id: 500,
                        mg_state: true,
                        mobile: this.addUserForm.Fnumber,
                        role_name: '超级管理员',
                        username: this.addUserForm.userName
                    })
                } else {
                    this.$message.error('请完整的填写表中的信息')
                }
            })
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
.el-table {
    margin-top: 20px;
}
</style>
