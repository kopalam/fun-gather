<template>
    <el-container :style="{height: screenHeight + 'px'}">
        <el-header class="flex header-wrap">
            <div class="header-title b-green t-while">异域街舞后台</div>
            <div class="flex1 header-handle">
                <el-dropdown>
                    <span class="header-username">{{nickName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px" class="side"><Menu :minH="(screenHeight - 60) + 'px'"/></el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script type="text/ecmascript-6">
    import Menu from '@/components/Menu/index'
    export default {
        name: 'Layout',
        components: { Menu },
        data () {
            return {
                screenHeight:  window.innerHeight,
                nickName: JSON.parse(window.localStorage.getItem('user')).auth
            }
        },
        mounted () {
            console.log(window.innerHeight)
            window.addEventListener('resize', this.handleResize)
        },
        methods: {
            handleResize() {
                console.log(window.innerHeight)
                this.screenHeight = window.innerHeight
            },
            logout () {
                this.$confirm('确认退出登录？')
                .then(() => {
                    localStorage.removeItem('user')
                    this.$router.go('/login')
                }).catch(() => {})
            }
        },
    }
</script>

<style scoped>
    .el-container .aside {
        background-color: rgb(30, 33, 42);
    }
    .header-wrap {
        background-color: rgb(30, 33, 42);
        color: #333;
        line-height: 60px;
        font-size: 12px;
        padding: 0;
    }
    .header-title {
        font-family: "微软雅黑";
        font-size: 20px;
        width: 200px;
        text-align: center;
    }
    .header-handle {
        text-align: right;
        color: #ffffff;
        padding: 0 20px;
    }
    .header-username {
        color: #ffffff;
        cursor: pointer;
    }
</style>