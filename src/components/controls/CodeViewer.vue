<template>
  <pre>
      <code class="language-html" v-html="sourceCode"></code>
  </pre>
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
            this.sourceCode = highlight.highlightAuto(code).value;
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