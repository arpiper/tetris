<template>
  <div class="played-pieces">
    <span 
      v-for="block in blocks" 
      class="block"
      :class="block.shape"
      :style="block.style">
    </span>
  </div>
</template>

<script>
export default {
  name: "played-pieces",
  props: {
    pieces: Array,
  },
  data () {
    return {
      blocks: [],
    }
  },
  methods: {
    addPiece: function (piece) {
      let bottom = []
      for (let i = 0; i < 4; i++) {
        let t = piece.pos.y + parseInt(piece.blocks[i].top)
        let l = piece.pos.x + parseInt(piece.blocks[i].left)
        let b = {
          style: {top: `${t}px`, left: `${l}px`},
          shape: piece.shape,
          orientation: piece.orientation,
        }
        this.blocks.push(b)
        bottom.push(b)
      }
      this.evtHub.$emit("adjust_bottom", bottom)
    },
    getShape: function (s, o) {

    }
  },
  watch: {
    pieces: function (value) {
      this.addPiece(value[value.length - 1])
    },
  },
}
</script>

<style scoped>
.played-pieces {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.block {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid black;
}
.I {
  background-color: lightblue;
}
.O {
  background-color: yellow;
}
.T {
  background-color: purple;
}
.S {
  background-color: green;
}
.Z {
  background-color: red;
}
.J {
  background-color: blue;
}
.L {
  background-color: orange;
}
</style>
