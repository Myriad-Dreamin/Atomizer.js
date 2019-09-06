/*jshint esversion: 6 */

<template>
    <div class="navigator">
		<ul>
            <li v-for="(refer, index) in refers" :key="index">
                <a v-on:click="linkTo(refer)">{{ refer.text }}</a>
            </li>
		</ul>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
    name: 'Navibar',
    methods: {
        linkTo(refer) {

            window.console.log("clicked...");


            if (refer.type == 0) {
                this.$router.push(refer.linker);
            } else {
                window.location.href = refer.linker;
            }
        }
    },
    props: ['refers']
};
</script>

<style scoped>
    .navigator {
        -webkit-app-region: drag;
        height: 42px;
        width: 100%;
        float: left;
        margin: 0px;
        padding: 0px;
        background: rgba(255, 255, 255, 0.900);
        top: 0;
        box-shadow: 0px 0px 3px #777777;
    }

    .navigator ul {
        margin: 0px;
        padding: 0px;
        list-style-type: none;
        width: auto;
        white-space: nowrap;
        overflow: hidden;
        padding: 0px;
    }

    .navigator li {
        float: left;
        position: relative;
        overflow: hidden;
    }

    .navigator li a {
        -webkit-app-region: no-drag;
        display: block;
        color: #636b6f;
        font-size: 20px;
        text-align: center;
        margin: 0px -1px 0px;
        padding: 10px 40px;
        font-family: 'Garamond', sans-serif;
        overflow: hidden;
        text-decoration: none;
    }

    .navigator li a:hover {
        color: rgba(99, 107, 111, 0.7);
        background: #fcfcfc;
        transition: all 0.2s;
    }
</style>
