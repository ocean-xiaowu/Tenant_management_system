<template>
    <div id="app">
        <el-dialog title="新增家属" :visible.sync="RelationDialog" class="el-dialog--center">
            <el-form :model="RelationForm" :rules="RelationRule" ref="RelationRef">
                <el-form-item label="家属姓名" label-width="120px" prop="name">
                    <el-input v-model="RelationForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="与户主的关系" label-width="120px" prop="Relation">
                    <el-select v-model="RelationForm.Relation" placeholder="请选择与户主的关系">
                        <el-option v-for="item in RelationData" :label="item.lable" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入住日期" label-width="120px" prop="datetime">
                    <el-date-picker v-model="RelationForm.datetime" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="离开日期" label-width="120px" prop="leaveTime">
                    <el-date-picker v-model="RelationForm.leaveTime" autocomplete="off"></el-date-picker>
                </el-form-item>
                <el-form-item label="身份证" label-width="120px" prop="identity">
                    <el-input v-model="RelationForm.identity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" label-width="120px" prop="mobile">
                    <el-input v-model="RelationForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" label-width="120px" prop="address">
                    <el-cascader v-model="RelationForm.address" :options="options"></el-cascader>
                </el-form-item>
                <el-form-item label="工作地址" label-width="120px" prop="workaddress">
                    <el-input v-model="RelationForm.workaddress" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="RelationDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitRelation">确 定</el-button>
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
            options: Addressdata,
            RelationDialog: false,
            RelationData: RelationData,
            RelationForm: {},
            // 校验规则
            RelationRule: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    {
                        min: 2,
                        max: 8,
                        message: '长度在 2 到 8 个字符',
                        trigger: 'blur'
                    }
                ],
                Relation: [
                    {
                        required: true,
                        message: '请输入与户主的关系',
                        trigger: 'change'
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
                address: [
                    {
                        required: true,
                        message: '请输入家庭住址',
                        trigger: 'change'
                    }
                ],
                workaddress: [
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
                    { required: true, message: '请输入时间', trigger: 'blur' }
                ],
                leaveTime: [
                    { required: true, message: '请输入时间', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitRelation() {
            this.$refs.RelationRef.validate(vali => {
                if (vali) {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    })
                    this.RelationDialog = false
                } else {
                    this.$notify({
                        title: '错误',
                        message: '完整填写输入框中的值！',
                        type: 'error'
                    })
                }
            })
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
