<template>
    <el-dialog :title="title" :visible.sync="visible" @close="closeModel" width="70vw">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.telephone" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.passwd" autocomplete="off" clearable></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeModel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
    let initData = {}
    export default {
        name: 'model',
        props: ['visible', 'modelDate'],
        data() {
            const checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'))
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value))
                    if (reg.test(value)) {
                        callback()
                    } else {
                        return callback(new Error('请输入正确的手机号'))
                    }
                }
            }
            return {
                form: {
                    name: '',
                    telephone: '',
                    passwd: '',
                },
                rules: {
                    name: [
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '请填写电话', trigger: 'blur' },
                    ],
                    passwd: [
                        { required: true, message: '请填写密码', trigger: 'blur' }
                    ],
                },
                formLabelWidth: '120px',
            }
        },
        watch: {
            modelDate: {
                handler(v) {
                    this.form = v.item
                },
                deep: true
            }
        },
        computed: {
            title () {
                return this.modelDate.type === 'create' ? '新建教师信息' : '修改教师信息'
            },
        },
        methods:{
            closeModel () {
                this.$emit('closeModel')
            },
            submit () {
                const form = this.form
                form.uid = form.teacher_id
                delete form.teacher_id
                delete form.cauth_iden
                delete form.avatar
                delete form.content
                this.$emit('submit', {
                    handle: this.modelDate.type,
                    ...form,
                })
            },
        },
        mounted () {
            initData = this.modelDate
        }

    }
</script>

<style scoped>

</style>