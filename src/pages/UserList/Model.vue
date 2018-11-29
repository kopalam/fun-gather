<template>
    <el-dialog :title="title" :visible.sync="visible" @close="closeModel" width="70vw">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" :value="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.telephone" autocomplete="off" :value="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.passwd" autocomplete="off" :value="form.passwd"></el-input>
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
            return {
                form: {
                    name: '',
                    telephone: '',
                    passwd: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请填写名称', trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '请填写电话', trigger: 'blur' }
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
                return this.modelDate.type === 'create' ? '新建用户' : '修改用户'
            },
        },
        methods:{
            closeModel () {
                this.$emit('closeModel')
            },
            submit () {
                const form = this.form
                this.$emit('submit', {
                    handle: this.modelDate.type,
                    ...form,
                })
                this.closeModel()
            },
        },
        mounted () {
            initData = this.modelDate
        }

    }
</script>

<style scoped>

</style>