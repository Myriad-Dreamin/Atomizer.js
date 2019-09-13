/*jshint esversion: 6 */

<template>
  <el-tabs class="view-able" v-model="activeName" :before-leave="onSwitch">
    
    <el-tab-pane name="op-intents-edit">
        <span slot="label"><i class="el-icon-document"></i>&nbsp;OpIntents</span>
        <transition name="el-fade-in-linear">
            <op-intents-edit  ref="op-intents-edit"/>
        </transition>
    </el-tab-pane>

    <el-tab-pane name="address-edit">
        <span slot="label"><i class="el-icon-edit-outline"></i>&nbsp;Address</span>
        <transition name="el-fade-in-linear">
            <address-edit  ref="address-edit"/>
        </transition>
    </el-tab-pane>

    <el-tab-pane name="self-account-edit">
        <span slot="label"><i class="el-icon-edit-outline"></i>&nbsp;My Accounts</span>
        <transition name="el-fade-in-linear">
            <self-account-edit  ref="self-account-edit"/>
        </transition>
    </el-tab-pane>

    <el-tab-pane name="session-edit">
        <span slot="label"><i class="el-icon-message"></i>&nbsp;Session</span>
        <transition name="el-fade-in-linear">
            <div class="content"  ref="session-edit">
                c
            </div>
        </transition>
    </el-tab-pane>
  </el-tabs>
</template>


<script>

import OpIntentsEdit from './OpIntentsEdit';
import AddressEdit from './AddressEdit';
import SelfAccountEdit from './SelfAccountEdit';


export default {
    name: 'Viewable',
    components: {
        OpIntentsEdit,
        AddressEdit,
        SelfAccountEdit,
    },
    data() {
      return {
        activeName: 'self-account-edit'
      };
    },
    methods: {
        onSwitch(newTab, oldTab) {
            var switchout = this.$refs[oldTab].onLeave;
            if (switchout) {
                switchout();
            } else {
                console.log("QAQ");
            }
            var swichin = this.$refs[newTab].onMounted;
            if (swichin) {
                swichin();
            } else {
                console.log("QAQ");
            }
        }
    },
};
</script>

<style>
div[class*="typeclass-"] > * {
  padding: 0.5em;
}

div[class*="typeclass-"] > *, code {
    font-family: "Fira Code",  Menlo, Consolas, "Courier New", Courier, "Avenir", Helvetica, Arial, sans-serif;
    font-size: 16px;
}

.typeclass-error > * {
  color: #e06c75;
}

.typeclass-number > * {
  color: #d19a66;
}

.typeclass-function > * {
    color: #c678dd;
}

.typeclass-undefined, .typeclass-boolean > * {
    color: #56b6c2;
}

.typeclass-string > * {
    color: #98c379;
}

.mbox {
  height: 100%;
  width: 0;
}
.console_dump {
  background: rgb(47, 52, 61);
}

.view-able .el-tabs__item {
    color: #ffffff;
    font-family: "STHeiti Light", "SimSun", "Microsoft YaHei",'-apple-system', 'SF UI Display', 'Arial',
    'PingFang SC', 'Hiragino Sans GB' , 'WenQuanYi Micro Hei', Helvetica, Arial, sans-serif;
}

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