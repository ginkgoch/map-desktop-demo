<template>
  <section>
      <pre v-for="(block, i) of sourceCode" :key="i">
        <span>{{ block.name }}</span>
        <code class="language-javascript" v-html="block.content" />
      </pre>
  </section>
</template>

<script>
import fs from 'fs';
import 'highlight.js/styles/atom-one-light.css';
import highlight from 'highlight.js';
import DemoUtils from '../../shared/DemoUtils';

export default {
    props: ['path'],
    data() {
        return {
            sourceCode: ''
        }
    },
    mounted() {
        this.$syncSourceCode(this.path);
    },
    methods: {
        $syncSourceCode(path) {
            if (path === undefined) { return; }

            const filePath = DemoUtils.resolveExtraResourcePath('demos/' + path.replace(/^\//i, '') + '.vue');
            if (!fs.existsSync(filePath)) { return; }

            let code = fs.readFileSync(filePath).toString();
            let codeBlocks = this.$fetchBlocks(code);
            codeBlocks.forEach(c => c.content = highlight.highlightAuto(c.content).value.trim());
            this.sourceCode = codeBlocks;
        },
        $fetchBlocks(code) {
            let begin = "<script>"; 
            let end = "/script>";
            let codeBegin = code.indexOf(begin);
            let codeEnd = code.indexOf(end);

            if (codeBegin !== -1 && codeEnd !== -1) {
                codeBegin += begin.length;
                let codeBlock = code.slice(codeBegin, codeEnd - 1);
                return [{ content: codeBlock }];
            }
            else {
                return [{ content: code }];
            }
        }
    },
    watch: {
        path(newValue) {
            this.$syncSourceCode(newValue);
        }
    }
}
</script>

<style>
code {
    text-align: left;
}

.hljs-ln-numbers {
    color: #cccccc;
}

.hljs-ln-code {
    padding-left: 30px!important;
}
</style>