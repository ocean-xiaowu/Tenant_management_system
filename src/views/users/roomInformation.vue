<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-card style="margin-right:10px">
                    <div class="url">
                        <!-- 头像 -->
                        <div class="urlbox">
                            <img class="imgStyle" :src="imgurl" alt />
                        </div>
                        <!-- userName -->
                    </div>
                    <div class="userNameBox">{{userName}}</div>
                    <!-- detail -->
                    <div>
                        <el-form ref="form" :model="detailFormData" label-width="70px" size="small ">
                            <el-form-item label="房间号">
                                <el-input v-model="detailFormData.roomNumber" disabled style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="用户姓名">
                                <el-input v-model="detailFormData.userName" :disabled="editDetail" style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="账号">
                                <el-input v-model="detailFormData.id" :disabled="editDetail" style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="detailFormData.password" disabled style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="用户权限">
                                <el-input v-model="detailFormData.userRight" disabled style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="detailFormData.email" :disabled="editDetail" style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <el-input v-model="detailFormData.pNumber" :disabled="editDetail" style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="房间号">
                                <el-input v-model="detailFormData.roomNumber" :disabled="editDetail" style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="房间号">
                                <el-input v-model="detailFormData.roomNumber" :disabled="editDetail" style="width:92%"></el-input>
                            </el-form-item>
                            <el-form-item label="房间号">
                                <el-input v-model="detailFormData.roomNumber" :disabled="editDetail" style="width:92%"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 修改保存 -->
                    <div style="text-align:right;margin-right:25px">
                        <el-button v-if="editBoool" size="mini" type="primary" @click="setDetail">修改</el-button>
                        <el-button v-if="cancelBoool" size="mini" type="primary" @click="cancel">取消</el-button>
                        <el-button v-if="subBoool" size="mini" @click="submitDetail" type="primary">保存</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card></el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import throatButton from '../../components/throatButton.vue'
export default {
    components: {
        throatButton
    },
    data() {
        return {
            imgurl: 'https://img2.baidu.com/it/u=42440934,3756045585&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            userName: 'ocean',
            detailFormData: {
                roomNumber: 101,
                id: '412122',
                email: '',
                password: '',
                userName: 'ocean',
                userRight: '房东',
                pNumber: 17681326521
            },
            editDetail: true,
            subBoool: false,
            editBoool: true,
            cancelBoool: false
        }
    },
    methods: {
        // 修改
        setDetail() {
            this.editBoool = false
            this.subBoool = true
            this.cancelBoool = true
            this.editDetail = false
        },
        // 提交
        submitDetail() {
            this.editDetail = true
            this.subBoool = false
            this.editBoool = true
            this.cancelBoool = false
        },
        // 取消
        cancel() {
            this.cancelBoool = false
            this.editBoool = true
            this.editDetail = true
            this.subBoool = false
        }
    }
}
</script>

<style scopde>
.url {
    height: 80px;
}

.imgStyle {
    width: 100%;
    border-radius: 40px;
}
.urlbox {
    width: 80px;
    margin: 0 auto;
    border: 1px solid #eee;
    border-radius: 40px;
    height: 80px;
}
.userNameBox {
    text-align: center;
    font-size: 18px;
    color: #333;
    padding: 10px 0;
    font-weight: bold;
}
</style>