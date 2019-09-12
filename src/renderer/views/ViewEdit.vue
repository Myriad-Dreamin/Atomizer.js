a<template>
    <div style="height:100%;" id="wrapper" class="console">
        <div class="backwrap">
            <el-containter style="height:100%;" class="main-container">
                <el-header :height="'42px'">
                    <navi-bar></navi-bar>
                </el-header>
                <el-main>
                    <div style="height:42px"></div>
                    <v-editor/>
                </el-main>
            </el-containter>
        </div>
    </div>
</template>

<script>

import MainNavibar from '@components/navibar/MainNavibar.vue';
import Viewable from '@components/view-able/Viewable.vue';
// import MdLoader from '@/components/MdLoader';

export default {
    name: 'ViewEdit',
    components: {
        'v-editor': Viewable,
        'navi-bar': MainNavibar,
    },
    mounted() {
        document.getElementById('wrapper').style.backgroundImage = 'url(file://E:/project/js/electron/atomizer.js/static/.background.jpg)';
    },
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

        background-repeat: repeat-x;
        background-size: cover;
        background-position: right;
        background-attachment:fixed;
        z-index: -1;
    }

    
    .backwrap {
        background-color:rgba(47, 52, 61, 0.2);
        content: '';
        width: 100%;
        height: 100%; overflow: auto;
        z-index: 1;
    }


    .console {
        overflow: scroll;
    }
    .console::-webkit-scrollbar {
        display: none;
    }
</style>
