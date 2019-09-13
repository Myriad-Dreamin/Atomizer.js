/*jshint esversion: 6 */

<template>
    <div class="content">
        
        <div>
            <el-button style="float: right; margin: 20px 40px 20px 20px;" @click="addAccount">添加Account</el-button>
            <div class="hidden-select">
                <el-upload
                ref="upload"
                :show-file-list="false"
                action="nothing"
                :on-change="onBootIn"
                :auto-upload="false">
                <el-button slot="trigger" style="float: right; margin: 20px;">导入</el-button>
                </el-upload>
            </div>
            <el-button style="float: right; margin: 20px;" @click="saveToDB">保存</el-button>
            <div class="clearfix"></div>
        </div>
        <el-card :v-model="accounts" class="box-card" v-for="(account, index) in accounts" v-bind:key="index">
            <div slot="header" class="clearfix">
                <span>Account</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="delaccount(index)">删除</el-button>
            </div>
            <el-form class="account-body" :model="account"
                :rules="{
                    chainID: [
                        {validator: chainIDValidator, trigger: 'blur,change'},
                    ],
                    privateKey: [
                        {validator: privateKeyValidator, trigger: 'blur,change'},
                    ]
                }"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item prop="chainID">
                            <el-select class="addr-sel" v-model="account.chainID" placeholder="ChainID">
                                <el-option
                                v-for="item in chainIDs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                    <el-form-item prop="privateKey">
                        <el-input class="contact" v-model="account.privateKey" placeholder="Private Key"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>

    </div>
</template>

<script>
import { myriad } from '@module/global';


export default {
    name: 'SelfAccountEdit',
    data() {
      return {
        chainIDs: [{
            value: 1,
            label: 'Ethereum Chain1'
        }, {
            value: 2,
            label: 'Ethereum Chain2'
        }, {
            value: 3,
            label: 'NSB'
        }, {
            value: 4,
            label: 'Tendermint Chain1'
        }],
        accounts: [{
            account: '',
            chainID: '',
        }],
      }
    },
    mounted() {
        this.onMounted();
    },
    methods: {
        chainIDValidator(rule, value, callback) {
            if (value === '') {
                callback(new Error('chainID is required'));
            } else {
                callback();
            }
        },
        privateKeyValidator(rule, value, callback) {
            if (value === '') {
                callback(new Error('private Key is required'));
            } else {
                callback();
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        addAccount() {
            this.accounts.push({
                privateKey: '',
                chainID: '',
            });
        },
        delaccount(index) {
            this.accounts.splice(index, 1);
        },
        setaccountListFromObject(objs) {
            if (objs instanceof Array) {
                this.accounts = objs;
            } else {
                this.accounts = [objs];
            }
        },
        boot(file) {
            var reader = new FileReader();
            var farthis = this;
            reader.onload = function() {
                farthis.setaccountListFromObject(JSON.parse(this.result));
            }
            reader.readAsText(file);
        },
        onBootIn(file) {
            this.boot(file.raw);
        },

        dropping(e) {
            e.preventDefault();
            e.stopPropagation();

            for (const f of e.dataTransfer.files) {
                console.log('File(s) you dragged here: ', f);
                this.boot(f);
            }
        },
        dragging(e) {
            e.preventDefault();
            e.stopPropagation();
            for (const f of e.dataTransfer.files) {
                console.log('File(s) you are dragging here: ', f)
            }
        },
        onMounted() {
            document.addEventListener('drop', this.dropping, true);
            document.addEventListener('dragover', this.dragging, true);
        },
        onLeave() {
            document.removeEventListener('drop', this.dropping, true);
            document.removeEventListener('dragover', this.dragging, true);
        },
        saveToDB() {
            var err = null;
            let cb = (e) => {
                err = e
            }
            for (let account of this.accounts) {
                this.chainIDValidator(null, account.chainID, cb);
                if (err != null) {
                    alert(err);
                    return
                }
                this.privateKeyValidator(null, account.privateKey, cb);
                if (err != null) {
                    alert(err);
                    return
                }
            }

            var userdb = myriad.userdb
            console.log("QAQ");
            var err = userdb.updateKeys(this.accounts)
            if (err) {
                alert(err);
                return;
            }
            this.accounts = [{
                account: '',
                chainID: '',
            }];
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

.account-body {
    padding: 10px;
}

.hidden-select .el-upload {
    display: block;
}
</style>