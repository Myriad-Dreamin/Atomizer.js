/*jshint esversion: 6 */

<template>
    <div class="content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>First Intents</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div>
                <el-select v-model="value" placeholder="Type" style="width:100%;margin:10px;">
                    <el-option
                    v-for="item in intentType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
                <el-select v-model="svalue" placeholder="Source" style="width:100%;margin:10px;">
                    <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
                <el-select v-model="tvalue" placeholder="Destination" style="width:100%;margin:10px;">
                    <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </div>
        </el-card>
    </div>
</template>


<script>



export default {
    name: 'Viewable',
    data() {
      return {
        cities: [{
          value: 'Beijing',
          label: '北京'
        }, {
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Nanjing',
          label: '南京'
        }, {
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }],
        intentType: [{
            value: 'Payment',
            label: '交易'
        }, {
            value: 'Invocation',
            label: '函数调用'
        }],
        value: '',
        svalue: '',
        tvalue: '',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
};
</script>

<style>

.view-able .content {
    color: #ffffff;
    font-size: 16px;
    font-family: "STHeiti Light", "SimSun", "Microsoft YaHei",'-apple-system', 'SF UI Display', 'Arial',
    'PingFang SC', 'Hiragino Sans GB' , 'WenQuanYi Micro Hei', Helvetica, Arial, sans-serif;
}

.el-card.box-card {
    background: rgba(255, 255, 255, 0.95);
}
</style>