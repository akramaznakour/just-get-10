<template> 
  <div class="square" :class="square | squareClasses"  @click="select(square)">    
    <div class="number">
    {{square.number}}
    </div>
  </div> 
</template>

<script>
export default {
  name: "square",

  props: {
    square: {
      type: Object,
      required: true
    }
  },

  methods: {
    select: function(square) {
      this.$store.dispatch("select", square);
    }
  },

  filters: {
    squareClasses: square => {
      let selected = square.selected ? "selected" : "";
      let landing = square.landing ? "landing" : "landed";

      let slide = "";

      switch (square.sliding) {
        case "left":
          slide = "slidingLeft";
          break;
        case "right":
          slide = "slidingRight";
          break;
        case "up":
          slide = "slidingUp";
          break;
      }

      return `number-${square.number} ${selected} ${landing} ${slide}`;
    }
  }
};
</script>