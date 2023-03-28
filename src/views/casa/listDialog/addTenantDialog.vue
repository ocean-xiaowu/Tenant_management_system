<template>
    <div id="app">
        <el-dialog title="新增房客" :visible.sync="addTenantDialog" class="el-dialog--center">
            <el-form :model="TenantForm" :rules="TenantRule" ref="TenantRef">
                <el-form-item label="房间号" label-width="120px" prop="RoomNumber">
                    <el-input v-model="TenantForm.RoomNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="120px" prop="name">
                    <el-input v-model="TenantForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证" label-width="120px" prop="identity">
                    <el-input v-model="TenantForm.identity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" label-width="120px" prop="mobile">
                    <el-input v-model="TenantForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入住时间" label-width="120px" prop="datetime">
                    <el-date-picker v-model="TenantForm.datetime" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="离开时间" label-width="120px" prop="leaveTime">
                    <el-date-picker v-model="TenantForm.leaveTime" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="家庭住址" label-width="120px" prop="homeaddRess">
                    <el-cascader v-model="TenantForm.homeaddRess" :options="options"></el-cascader>
                </el-form-item>
                <el-form-item label="工作地址" label-width="120px" prop="address">
                    <el-input v-model="TenantForm.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitCasa">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Addressdata from '../../../plugins/pcas-code.json'
export default {
    data() {
        // 身份证校验规则
        var checkidentity = (rule, value, cb) => {
            const regidentity =
                /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            if (regidentity.test(value)) {
                return cb()
            }
            cb(
                this.$notify.info({
                    title: '错误',
                    message: '输入的身份证不合法'
                })
            )
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
            // 地址数据
            options: Addressdata,
            addTenantDialog: false,
            // 提交表单数据
            TenantForm: {
                // 家庭住址
                homeaddRess: []
            },
            // 地址弹框类型
            siteType: '',
            // 详细地址
            DetailSite: '',
            // 校验规则
            TenantRule: {
                RoomNumber: [
                    {
                        required: true,
                        message: '请输入房间号',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 3,
                        message: '长度在 2 到 3 个字符',
                        trigger: 'blur'
                    }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    {
                        min: 2,
                        max: 8,
                        message: '长度在 2 到 8 个字符',
                        trigger: 'blur'
                    }
                ],
                identity: [
                    {
                        required: true,
                        message: '请输入正确的身份证',
                        trigger: 'blur'
                    },
                    { validator: checkidentity, trigger: 'blur' }
                ],
                mobile: [
                    {
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                homeaddRess: [
                    {
                        required: true,
                        message: '请输入家庭住址',
                        trigger: 'change'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入工作地址',
                        trigger: 'blur'
                    },
                    {
                        min: 10,
                        max: 50,
                        message: '长度在 10 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                datetime: [
                    {
                        required: true,
                        message: '请输入入住时间',
                        trigger: 'blur'
                    }
                ],
                leaveTime: [
                    { required: true, message: '请输入租期', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //取消
        cancel() {
            // 弹框消失
            this.addTenantDialog = false
            // 清除弹框内容
            this.$refs.TenantRef.resetFields()
        },
        // 先校验再提交
        submitCasa() {
            this.$refs.TenantRef.validate(vali => {
                console.log(vali)
            })
        }
    }
}
</script>

<style scoped>
.el-input {
    width: 95%;
}
::v-deep .v-dropdown-caller {
    width: 193px;
}
.el-cascader {
    width: 95%;
}
::v-deep .el-dialog__body {
    text-align: center;
}
::v-deep .el-form-item__error {
    left: 16px;
}
</style>
