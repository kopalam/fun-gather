/**
* User: vickyzhe@outlook.com
* Date: 2018/11/23
* Time: 上午9:21
*
*/
<template>
    <div>
        <PageTitle :title="'分类管理'">
            <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="handleCreate"
            >新建</el-button>
        </PageTitle>

        <el-table
                :data="classifyDatas"
                border
                style="width: 100%">
            <el-table-column
                    prop="kinds"
                    label="名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="所属父类">
                <template slot-scope="scope">
                    {{ scope.row.parent !== 0 ? scope.row.parent : '' }}
                </template>
            </el-table-column>
            <el-table-column
                    label="封面"
                    width="100">
                <template slot-scope="scope">
                    <img v-if="scope.row.image !== '0'" :src="baseUrl + scope.row.image" width="100%"/>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleChangeStatus(scope.row.route_id)">{{ scope.row.status === 0 ? '禁用' : '启用' }}</el-button>
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<div class="page-station">-->
            <!--<el-pagination-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page.sync="page"-->
                    <!--:page-size="10"-->
                    <!--layout="total, prev, pager, next, jumper"-->
                    <!--:total="classifyDatas.length">-->
            <!--</el-pagination>-->
        <!--</div>-->
        <Model :visible="showModel" :modelDate="modelDate" @closeModel="closeModel(e)" @submit="submit"></Model>
    </div>
</template>

<script type="text/ecmascript-6">
    import PageTitle from '@/components/PageTitle/index'
    import config from '@/utils/config'
    import Model from './Model'
    export default {
        name: 'Classify',
        components: { PageTitle, Model },
        data () {
            return {
                classifyDatas: [],
                baseUrl: config.baseUrl,
                page: 1,
                modelDate: {
                    type: 'create',
                    item: {},
                    parent: []
                },
                showModel: false,
            }
        },
        methods: {
            getClassify () {
              this.$request({
                  url: 'apis/addons/kinds/kinds/getkinds',
              }).then(res => {
                  this.classifyDatas = res.data
                  this.modelDate.parent = res.data
              })
            },
            handleCreate () {
                this.showModel = true
                this.modelDate.type = 'create'
                this.modelDate.item = {
                    kinds: '',
                    image: '',
                }
            },
            handleEdit (v) {
                this.showModel = true
                this.modelDate.type = 'edit'
                this.modelDate.item = v
            },
            submit (data) {
                this.$request({
                    url: 'apis/addons/kinds/kinds/kindshandle',
                    data,
                }).then(() => {
                    let message = ''
                    if (data.handle === 'create') {
                        message = '新增分类成功'
                    } else {
                        message = '修改分类成功'
                    }
                    this.$message({ message, type: 'success'})
                    this.getClassify()
                })
            },
            handleChangeStatus (route_id) {
                this.$request({
                    url: 'apis/addons/kinds/kinds/kindshandle',
                    data: {
                        handle: 'disable',
                        route_id,
                    }
                }).then (() => {
                    this.$message({ message: '操作成功', type: 'success'})
                    this.getClassify()
                })
            },
            closeModel (e) {
                this.showModel = e
                this.getClassify()
            },
            handleCurrentChange () {

            },
        },
        mounted () {
            this.getClassify()
        }
    }
</script>

<style scoped>

</style>