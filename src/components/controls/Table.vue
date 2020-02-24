<template>
<div class="feature-table">
  <table class="table table-sm" v-if="tableSource.length > 0">
    <thead>
      <tr>
        <th v-for="(cell, k) of tableSource[0]" :key="k">{{ cell }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rkey) of tableSource.slice(1)" :key="rkey">
        <td v-for="(cell, ckey) of row" :key="ckey" class="small">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
    name: 'source-table',
    props: ['source'],
    data() {
        return { tableSource: [] };
    },
    watch: {
        source(newValue) {
            this.tableSource = newValue;
        }
    }
};
</script>

<style>
.feature-table {
  max-height: 400px;
  overflow-y: auto;
}
</style>