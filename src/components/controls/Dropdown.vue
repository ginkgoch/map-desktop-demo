<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >{{ selected }}</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a
        class="dropdown-item"
        href="javascript:void(0)"
        v-for="(item, i) of items"
        :key="i"
        @click="onChanged(item)"
      >{{ item }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: ["title", "items"],
  data() {
    return {
      selected: this.title
    };
  },
  methods: {
    onChanged(label) {
      this.selected = label;
      this.$emit("changed", this.selected);
    }
  }
};
</script>

<style>
</style>