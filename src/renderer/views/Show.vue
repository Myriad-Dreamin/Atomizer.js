<template>
    <div style="height:100%;" id="wrapper" class="console">
        <el-containter style="height:100%;" class="main-container">
            <el-header :height="'42px'">
                <navi-bar></navi-bar>
            </el-header>
            <el-main>
                <div style="height:42px"></div>
                <v-console/>
            </el-main>
        </el-containter>
    </div>
</template>

<script>

import MainNavibar from '@components/navibar/MainNavibar.vue';
import Console from '@components/Console.vue';
// import MdLoader from '@/components/MdLoader';

export default {
    name: 'console',
    components: {
        // MdLoader,
        'v-console': Console,
        'navi-bar': MainNavibar,
    }
};
</script>
<style scoped>
    .main-container .el-header {
        padding: 0;
        position: absolute;
        width: 100%;
    }

    .clearfix {
        clear: both;
    }

    #wrapper {
        height: 100%;
        background: rgb(47, 52, 61);
    }

    .console {
        overflow: scroll;
    }
    .console::-webkit-scrollbar {
        display: none;
    }
</style>
