/*jshint esversion: 6 */

<template>
    <div class="content">
        
        <div>
            <el-button style="float: right; margin: 20px 40px 20px 20px;" @click="addAddress">添加Address</el-button>
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
        <el-card :v-model="addresses" class="box-card" v-for="(address, index) in addresses" v-bind:key="index">
            <div slot="header" class="clearfix">
                <span>Addresses</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="delAddress(index)">删除</el-button>
            </div>
            <el-form class="address-body" :model="address"
                :rules="{
                    name: [
                        {validator: nameValidator, trigger: 'blur,change'},
                    ],
                    chainID: [
                        {validator: chainIDValidator, trigger: 'blur,change'},
                    ],
                    address: [
                        {validator: addressValidator, trigger: 'blur,change'},
                    ]
                }"
            >
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="name">
                            <el-input class="contact" v-model="address.name" placeholder="Name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="6">
                        <el-form-item prop="chainID">
                            <el-select class="addr-sel" v-model="address.chainID" placeholder="ChainID">
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
                    <el-col :span="6">
                    <el-form-item prop="address">
                        <el-input class="contact" v-model="address.address" placeholder="Address"></el-input>
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
    name: 'Viewable',
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
        addresses: [{
            name: '',
            address: '',
            chainID: '',
        }],
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      }
    },
    mounted() {
        this.onMounted();
    },
    methods: {
        nameValidator(rule, value, callback) {
            if (value === '') {
                callback(new Error('name is required'));
            } else {
                callback();
            }
        },
        chainIDValidator(rule, value, callback) {
            if (value === '') {
                callback(new Error('chainID is required'));
            } else {
                callback();
            }
        },
        addressValidator(rule, value, callback) {
            if (value === '') {
                callback(new Error('address is required'));
            } else {
                callback();
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        addAddress() {
            this.addresses.push({
                name: '',
                address: '',
                chainID: '',
            });
        },
        delAddress(index) {
            this.addresses.splice(index, 1);
        },
        setAddressListFromObject(objs) {
            if (objs instanceof Array) {
                this.addresses = objs;
            } else {
                this.addresses = [objs];
            }
        },
        boot(file) {
            var reader = new FileReader();
            var farthis = this;
            reader.onload = function() {
                farthis.setAddressListFromObject(JSON.parse(this.result));
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
            for (let address of this.addresses) {
                this.nameValidator(null, address.name, cb);
                if (err != null) {
                    alert(err);
                    return
                }
                this.chainIDValidator(null, address.chainID, cb);
                if (err != null) {
                    alert(err);
                    return
                }
                this.addressValidator(null, address.address, cb);
                if (err != null) {
                    alert(err);
                    return
                }
            }

            var userdb = myriad.userdb
            console.log("QAQ");
            var err = userdb.updateContact(this.addresses)
            if (err) {
                alert(err);
                return;
            }
            this.addresses = [{
                name: '',
                address: '',
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

.address-body {
    padding: 10px;
}

.hidden-select .el-upload {
    display: block;
}
</style>