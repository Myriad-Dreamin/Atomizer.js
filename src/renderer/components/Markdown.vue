/*jshint esversion: 6 */

<template>
  <div v-html="renderContent">abc</div>
</template>
<script>
import { DisableHtml, EnableHtml } from '@main/katex.js';
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        html: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        renderContent() {
            let content = this.html
                ? EnableHtml.render(this.text)
                : DisableHtml.render(this.text);
            window.console.log(content);
            return content;
        }
    }
};
</script>
<style scoped>
    @import "../assets/atom-one-dark.css";
    code {
        font-family: "Fira Code",  Menlo, Consolas, "Courier New", Courier, "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 23px;
        font-size: 15px;
        box-shadow: none;
    }
    pre {
    width: 65em;
    }
</style>
