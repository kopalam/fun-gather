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
                :data="gatherType"
                border
                style="width: 60%">
            <el-table-column
                    prop="id"
                    label="编号"
                    width="120">
            </el-table-column>
              <el-table-column
                    prop="name"
                    label="名称"
                    width="240">
            </el-table-column>
             <el-table-column
                    prop="gather_rule_id"
                    label="规则组id"
                    width="130">
            </el-table-column>
             <el-table-column
                    prop="rules"
                    label="规则组"
                    width="230">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="140">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleChangeStatus(scope.row.id)">{{ scope.row.status === 1 ? '禁用' : '启用' }}</el-button>
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
                gatherType: [],
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
            getType () {
              this.$request({
                  url: 'gatherType',
                  data:{
                        handle:'list'
                  }
              }).then(res => {
                  this.gatherType = res.data
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
                    url: 'gatherType',
                    data,
                }).then(() => {
                    let message = ''
                    if (data.handle === 'create') {
                        message = '新增分类成功'
                    } else {
                        message = '修改分类成功'
                    }
                    this.$message({ message, type: 'success'})
                    this.$getType()
                })
            },
            handleChangeStatus (route_id) {
                this.$request({
                    url: 'gatherType',
                    data: {
                        handle: 'disable',
                        id:route_id,
                    }
                }).then (() => {
                    this.$message({ message: '操作成功', type: 'success'})
                    this.getType()
                })
            },
            handleDelete (route_id) {
                this.$request({
                    url: 'gatherType',
                    data: {
                        handle: 'delete',
                        id:route_id,
                    }
                }).then (() => {
                    this.$message({ message: '操作成功', type: 'success'})
                    this.getType()
                })
            },
            closeModel (e) {
                this.showModel = e
                this.getType()
            },
            handleCurrentChange () {

            },
        },
        mounted () {
            this.getType()
        }
    }
</script>

<style scoped>

</style>