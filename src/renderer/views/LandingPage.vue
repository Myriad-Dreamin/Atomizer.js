<template>
  <div style="height:100%;" id="wrapper">
    <el-containter style="height:100%;" class="main-container">
        <el-header :height="'42px'">
            <navi-bar></navi-bar>
        </el-header>
        <el-main>
            <el-row :gutter="30" style="height:100%;" >
            <el-col :span="9" style="height:100%;">
                <div class="grid-content bg-purple" style="height:100%;">
                    <el-container>
                    <el-header class="left-header">
                        <span class="left-header-title"> Attribute </span>
                    </el-header>
                    
                    <el-main>
                    <div class="profiler-item"  v-for="kv in currentAttr" :key="kv.id">
                        <div class="profiler-item-key">{{kv.key}}</div>
                        <div class="profiler-item-value">{{kv.value}}</div>
                    </div>
                    </el-main>
                </el-container>
                </div>
            </el-col>
            <el-col :span="15" style="height:100%;">
                <div class="grid-content bg-purple" style="height:100%;">
                    <el-container>
                    <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>王小虎</span>
                    </el-header>
                    
                    <el-main>
                    <el-card class="box-card"  v-for="article in currentData" :key="article.id">
                        <div slot="header" class="clearfix">
                            <span>{{ article.date }}</span>
                            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                        </div>
                        <div>
                            <a>Publish at: {{ article.name }}</a>
                        </div>
                        <div>
                            <a>{{ article.address }}</a>
                        </div>
                    </el-card>
                    <el-pagination
                        class="epage"
                        @size-change="handleSizeChange" 
                        @current-change="handleCurrentChange" 
                        :page-size="pageSize" 
                        :total="total"
                        layout="prev, next, jumper">
                    </el-pagination>
                    </el-main>
                </el-container>
                </div>
                </el-col>
        </el-row>
        </el-main>
    </el-containter>
  </div>
</template>
<!-- :current-page="currentPage" -->
<!-- layout="total, sizes, prev, pager, next, jumper"> -->
<script>

import MainNavibar from '@components/navibar/MainNavibar.vue';
export default {
    mounted() {
        this.pageSize = 4;
        this.total = 20;
        this.currentPage = 1;
        this.getData();
    },
    name: 'landing-page',
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            window.console.log("datachanged", val);
            this.getData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            window.console.log("qwq", val);
            this.getData();
        },
        getData() {
            window.console.log("datachanged", this.pageSize);
            window.console.log("qwq", this.currentPage);
            window.console.log("page...", (this.currentPage - 1) * (this.pageSize), (this.currentPage) * (this.pageSize));
            this.currentData = this.tableData.slice((this.currentPage - 1) * (this.pageSize), this.currentPage * this.pageSize);
        }
    },
    components: {
        'navi-bar': MainNavibar
    },
    data() {
        let item = Array(20);
        for (let i = 0; i < 20; i++) {
            item[i] = new Object();
            item[i].date = i;
            item[i].name = '王小虎';
            item[i].address =  '上海市普陀区金沙江路 1518 弄';
        }
        return {
            tableData: item,
            currentData: null,
            currentAttr: [],
            pageSize: 4,
            total: 20,
        }
    }
}
</script>


<style>

    .main-container .el-header {
        padding: 0;
    }

    #wrapper {
        height: 100%;
    }
    .el-row {
    margin-bottom: 20px;    
    }
    .el-col {
    border-radius: 4px;
    }
    .bg-purple-dark {
    background: #99a9bf;
    }
    .bg-purple {
    background: #d3dce6;
    }
    .bg-purple-light {
    background: #e5e9f2;
    }

    .profiler-item {
        position: relative;
	    padding-left: 5px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 46px;
        font-size: 18px;
        border-top: 1px solid #ebebeb;
    	font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    }

    .profiler-item-key {
        display:block;
        float: left;
        margin-left: 10px;
    }

    .profiler-item-value {
        display:block;
        position: absolute; right: 10px;
    }

    .grid-content {
    border-radius: 4px;
    min-height: 36px;
    }
    .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
    }

    .text {
    font-size: 14px;
    }

    .item {
    margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
    display: table;
    content: "";
    }
    .clearfix:after {
    clear: both
    }

    .box-card {
        margin: 40px;
    }
    .epage {
        text-align: center;
    }
    .left-header {
        margin-top: 40px;
        text-align: center;
    }
    .left-header-title {
    	font-family: Garamond, -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
        font-size: 28px;
    }
</style>
