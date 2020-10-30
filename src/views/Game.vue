<template>
  <div>
    <div class="score">
      Score: {{ this.$store.state.score }} Range: {{ this.$store.state.range }}
    </div>
    <div class="grid">
      <square
        v-for="square in this.$store.state.squares"
        :square="square"
        :key="square.index"
      />
    </div>
  </div>
</template>

<script>
import square from "../components/Square.vue";
export default {
  name: "game",
  components: { square },
  mounted() {
    this.$store.dispatch("initialize");
  },
  destroyed() {
    this.$store.dispatch("destroy");
  }
};
</script>
