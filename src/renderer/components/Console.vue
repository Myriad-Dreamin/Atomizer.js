/*jshint esversion: 6 */

<template>
  <div>
    <div class="console_dump">
      <div v-for="idx in input_list.length" :key="idx">
        <loader :text="input_list[idx-1]" html></loader>

        <div v-if="value_list[idx-1].type==='object' || value_list[idx-1].type==='array' ">
          <tree-view
            :class="value_list[idx-1].class"
            :option="{maxDepth: 4}"
            :data="value_list[idx-1].value"
          />
        </div>
        <div v-else>
          <loader :text="output_list[idx-1]" html></loader>
        </div>
      </div>
    </div>
    <el-input placeholder="请输入内容" v-model="input_load" @keyup.enter.native="consoleDumpIt" />
  </div>
</template>


<script>
import loader from './Markdown.vue';
import { stringify } from 'querystring';

export default {
    name: 'Console',
    components:{
        loader,
    },
    methods: {
        consoleDumpIt(){
            console.log("called");
            this.input_list.push('```javascript\n> '+this.input_load+'\n```\n');
            var rv = this.evaluate(this.input_load);
            try {
                let output = this.render(rv);
                console.log(output);

                this.value_list.push(output);

                this.output_list.push(this.htmlize(this.output_list.length, output) +'\n');
            } catch(e) {
                console.log(e);
                this.output_list.push('\n');
            };
            
            this.input_load = '';
        },
        evaluate(code) {
            var out = {};
            try {
                out = eval.call(null, code);
            } catch (e) {
                out = e;
            }
            return out;
        },
        render(value) {
            var type = typeof value;
            if (value instanceof Error) type = 'error';
            if (value === null) type = 'null';
            var output = {
                value : value,
                type : type,
                class : 'typeclass-' + type
            };

            switch (type) {
                case "string":
                output.formatted =  '"' + value + '"';
                // output.class = "string";
                break;
                case "undefined":
                output.formatted = "undefined";
                break;
                case "null":
                output.formatted = "null";
                break;
                case "object":
                case "array":
                output.formatted = "use value...";// JSON.stringify(value);
                break;
                case "error":
                output.formatted = value.message.trim();
                break;
                default:
                output.formatted = value.toString().trim();
            }
            return output;
        },
        htmlize(index, output) {
            if (output.type === "object" || output.type == "array") {
                
                return '<tree-view class="' + output.class + '" :theme="\'one-dark\'" :data="this.value_list['+ String(index) +']"/>';
            } else {
                return '<div class="' + output.class + '"><p>' + output.formatted +'</p></div>';
            }
        }
    },
    mounted() {
        window.console.log(this.input_list.length);
        window.console.log(this.input_list);

        window.db = {
            set(key, value) {
                window.db[key] = value;
                return true;
            },
            get(key) {
                return window.db[key];
            }
        }

        // this.axios.get('https://myriaddreamin.com:10777/api/musical').then((response) =>  {
        //     this.recommend_list = response.data;
        // });
    },

    /*
    a= {'1': 1, '2':[2,3]}
    
    */
    data () {
        return {
            input_list: [],
            output_list: [],
            value_list: [],
            input_load: '',
        };
    },
    // components: {
    //     'navi-bar': MainNavibar,
    //     'audio-s': AudioS
    // }
};
</script>

<style>
div[class*="typeclass-"] > * {
  padding: 0.5em;
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

.mbox {
  height: 100%;
  width: 0;
}
.console_dump {
  background: rgb(40, 44, 52);
}
</style>