<template>
    <el-dialog :title="title" :visible.sync="visible" @close="closeModel" width="70vw">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
                <el-input v-model="form.kinds" autocomplete="off" :value="form.kinds"></el-input>
            </el-form-item>
            <el-form-item label="选择父类" :label-width="formLabelWidth">
                <el-select v-model="form.parent_id" placeholder="无父类可不选" :value="form.parent_id">
                    <el-option label="无父类" value="0"></el-option>
                    <el-option v-for="parentData in parentDatas" :key="parentData.kid" :label="parentData.kinds" :value="parentData.kid + ''"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面" :label-width="formLabelWidth">
                <UploadImg @child-event="getImgDate" :imgUrl="form.image"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeModel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
    import UploadImg from '@/components/UploadImg/index'
    let initData = {}
    export default {
        name: 'model',
        components: { UploadImg },
        props: ['visible', 'modelDate'],
        data() {
            return {
                form: {
                    kinds: '',
                    kid: '',
                    image: '',
                },
                rules: {
                    kinds: [
                        { required: true, message: '请填写名称', trigger: 'blur' }
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
            parentDatas () {
                return this.modelDate.parent.filter(v => !v.parent && v.route_id !== this.modelDate.item.route_id)
            },
            title () {
                return this.modelDate.type === 'create' ? '新建分类' : '修改分类'
            },
        },
        methods:{
            closeModel () {
                this.$emit('closeModel', false)
            },
            getImgDate (data) {
                this.form.image = data
            },
            submit () {
                const form = this.form
                form.name = form.kinds
                delete form.kinds
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