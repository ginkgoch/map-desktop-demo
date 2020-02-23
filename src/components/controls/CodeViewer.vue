<template>
  <pre>
      <code class="language-html">{{ sourceCode }}</code>
  </pre>
</template>

<script>
import fs from 'fs';
import 'highlight.js/styles/atom-one-light.css';
import highlight from 'highlight.js';
import highlightjsLineNumbers from 'highlightjs-line-numbers2.js';
import DemoUtils from '../../shared/DemoUtils';

export default {
    props: ['path'],
    data() {
        return {
            sourceCode: ''
        }
    },
    mounted() {
        if (this.path === undefined) {
            return;
        }

        const filePath = DemoUtils.resolveExtraResourcePath('demos/' + this.path.replace(/^\//i, ''));
        if (!fs.existsSync(filePath)) {
            return;
        }

        this.sourceCode = fs.readFileSync(filePath).toString();
        highlight.initHighlightingOnLoad();
        highlightjsLineNumbers.init(highlight)
        highlight.initLineNumbersOnLoad({singleLine: true});
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