<template>
    <div style="height:100%;" id="wrapper">
        <el-containter style="height:100%;" class="main-container">
            <el-header :height="'42px'">
                <navi-bar></navi-bar>
            </el-header>
            <el-main>
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
<style>
    .main-container .el-header {
        padding: 0;
    }

    #wrapper {
        height: 100%;
    }
</style>
