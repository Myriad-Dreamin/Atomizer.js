/*jshint esversion: 6 */

<template>
    <div class="content">
        
        <div>
            <el-button style="float: right; margin: 20px 40px;" @click="addAddress">添加Address</el-button>
            <div class="clearfix"></div>
        </div>
        <el-card :v-model="addresses" class="box-card" v-for="(address, index) in addresses" v-bind:key="index">
            <div slot="header" class="clearfix">
                <span>Addresses</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="delAddress(index)">删除</el-button>
            </div>
            <div class="address-body">
                <el-row>
                    <el-col :span="5">
                        <el-input class="contact" v-model="address.name" placeholder="联系人名称"></el-input>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="5">
                        <el-select class="addr-sel" v-model="address.opType" placeholder="ChainID">
                            <el-option
                            v-for="item in intentType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5">
                        <el-select class="addr-sel" v-model="address.sourceAccount" placeholder="Source">
                            <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5">
                        <el-select class="addr-sel" v-model="address.targetAccount" placeholder="Destination">
                            <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
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
        addresses: [{
            name: '',
            opType: '',
            sourceAccount: '',
            targetAccount: '',
        }],
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      addAddress() {
        this.addresses.push({
            name: '',
            opType: '',
            sourceAccount: '',
            targetAccount: '',
        });
      },
      delAddress(index) {
          this.addresses.splice(index, 1);
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

.contact.el-input {
    margin: 10px 0;
}

.addr-sel.el-select {
    width: 100%;
    margin: 10px 0;
}

.address-body {
    padding: 10px;
}
</style>