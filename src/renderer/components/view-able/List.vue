/*jshint esversion: 6 */

<template>
    <div class="content">
        
        <div>
            <el-button style="float: right; margin: 20px 40px 20px 20px;" @click="searchAddress">Address</el-button>
            <el-button style="float: right; margin: 20px;" @click="searchAccount">Account</el-button>
            <div class="clearfix"></div>
        </div>
        <transition name="el-fade-in" @after-leave="justClearAccountArray">
            <el-card class="box-card" v-show="showAccount">
                <div slot="header" class="clearfix">
                    <span>Account</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="clearAccount()">关闭</el-button>
                </div>
                <el-table
                    :data="showingAccounts"
                    border
                    header-row-class-name="table-header"
                    @cell-click="onAccountClick"
                    style="width: 100%">
                    <el-table-column
                    prop="chainID"
                    align="center"
                    label="chain id"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="privateKey"
                    align="center"
                    label="private key">
                    </el-table-column>
                    <el-table-column
                    prop="publicKey"
                    align="center"
                    label="public key">
                    </el-table-column>
                </el-table>
            </el-card>
        </transition>

        <transition name="el-fade-in" @after-leave="justClearAddressArray">
            <el-card class="box-card" v-show="showAddress">
                <div slot="header" class="clearfix">
                    <span>Address</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="clearAddress()">关闭</el-button>
                </div>
                <el-table
                    :data="showingAddresses"
                    border
                    header-row-class-name="table-header"
                    @cell-click="onAddressClick"
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    align="center"
                    label="name"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="chainID"
                    align="center"
                    label="chain id">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    align="center"
                    label="address">
                    </el-table-column>
                </el-table>
            </el-card>
        </transition>
    </div>
</template>
<script src="https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"></script>
<script>
import { myriad } from '@module/global';
import _ from 'lodash';
var copyBuffer = document.createElement("textarea");
document.body.appendChild(copyBuffer);

// Place in top-left corner of screen regardless of scroll position.
copyBuffer.style.position = 'fixed';
copyBuffer.style.top = 0;
copyBuffer.style.left = 0;

copyBuffer.style.width = '2em';
copyBuffer.style.height = '2em';
copyBuffer.style.border = 'none';
copyBuffer.style.outline = 'none';
copyBuffer.style.boxShadow = 'none';

copyBuffer.style.zIndex = -500;

copyBuffer.style.background = 'transparent';
export default {
    name: 'ListView',
    data() {
      return {
        accounts: [],
        addresses: [],
        showAccount: false,
        showAddress: false,
      }
    },
    computed: {
        showingAccounts() {
            let saccounts = _.cloneDeep(this.accounts);
            for(let account of saccounts) {
                account.originPrivateKey = account.privateKey;
                if (account.privateKey.length > 64) {
                    account.privateKey = account.privateKey.slice(0, 64) + '...';
                }
                account.originPublicKey = account.publicKey;
                if (account.publicKey.length > 64) {
                    account.publicKey = account.publicKey.slice(0, 64) + '...';
                }
            }
            return saccounts;
        },
        showingAddresses() {
            let saddresses = _.cloneDeep(this.addresses);
            for(let account of saddresses) {
                account.originAddress = account.address;
                if (account.address.length > 64) {
                    account.address = account.address.slice(0, 64) + '...';
                }
            }
            return saddresses;
        },
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        clearAccount() {
            this.showAccount = false;
        },
        justClearAccountArray() {
            this.accounts = [];
        },
        clearAddress() {
            this.showAddress = false;
        },
        justClearAddressArray() {
            this.addresses = [];
        },
        searchAccount() {
            this.accounts = myriad.userdb.listKeys();
            this.showAccount = true;
        },
        searchAddress() {
            this.addresses = myriad.userdb.listContacts();
            this.showAddress = true;
        },
        onAccountClick(row, column, cell) {
            if (column.property === 'privateKey') {
                copyBuffer.value = row.originPrivateKey;
                copyBuffer.focus();
                copyBuffer.select();
                var successful = document.execCommand('copy');
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: successful?'拷贝成功':'QAQ拷贝失败了！',
                });
            } else if (column.property === 'publicKey') {
                copyBuffer.value = row.originPublicKey;
                copyBuffer.focus();
                copyBuffer.select();
                var successful = document.execCommand('copy');
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: successful?'拷贝成功':'QAQ拷贝失败了！',
                });
            }
        },
        onAddressClick(row, column, cell) {
            if (column.property === 'address') {
                copyBuffer.value = row.originAddress;
                copyBuffer.focus();
                copyBuffer.select();
                var successful = document.execCommand('copy');
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: successful?'拷贝成功':'QAQ拷贝失败了！',
                });
            }
        },
    },
};
</script>

<style scoped>

.view-able .content {
    color: #ffffff;
    font-size: 16px;
    font-family: "STHeiti Light", "SimSun", "Microsoft YaHei",'-apple-system', 'SF UI Display', 'Arial',
    'PingFang SC', 'Hiragino Sans GB' , 'WenQuanYi Micro Hei', Helvetica, Arial, sans-serif;
}

.afont {
    font-size: 14px;
    font-family: "Fira Code",  Menlo, Consolas, "Courier New", Courier, "Avenir", Helvetica, Arial, sans-serif;
}

.el-card.box-card {
    background: rgba(255, 255, 255, 0.95);
}

.table-header {
    font-size: 16px;
    font-family: "STHeiti Light", "SimSun", "Microsoft YaHei",'-apple-system', 'SF UI Display', 'Arial',
    'PingFang SC', 'Hiragino Sans GB' , 'WenQuanYi Micro Hei', Helvetica, Arial, sans-serif;
}

</style>