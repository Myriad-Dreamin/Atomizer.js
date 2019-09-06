/*jshint esversion: 6 */

<template>
    <navi-bar v-bind:refers="refers"></navi-bar>
</template>

<script>
import Navibar from './Navibar.vue';
export default {
    name: 'MainNavibar',
    data () {
        return {
            refers: [
                {
                    'linker': '/',
                    'text': 'Home',
                    'type': 0,
                },{
                    'linker': '/console',
                    'text': 'Console',
                    'type': 0,
                }
            ]
        };
    },
    components: {
        'navi-bar': Navibar
    }
};
</script>
