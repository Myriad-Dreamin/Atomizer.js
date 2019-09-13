/*jshint esversion: 6 */

<template>
    <div class="content">
        <transition name="el-fade-in">
            <ul>
                <li>
                    表格单击可以复制完整内容
                </li>
            </ul>
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
        showAccount: false,
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
        searchAccount() {
            this.accounts = myriad.userdb.listKeys();
            this.showAccount = true;
        },
        searchAddress() {},
        onAccountClick(row, column, cell) {
            console.log("clicked...", row, column);
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

</style>