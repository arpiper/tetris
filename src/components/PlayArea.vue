<template>
  <div class="playarea">
    <piece 
      :orientation="activePiece.orientation"
      :position="activePiece.pos" 
      :shape="activePiece.shape">
    </piece>
    <piece
      v-for="(p,i) in pieces"
      :key="i"
      :shape="p.share"
      :position="p.position">
    </piece>
  </div>
</template>

<script>
import Piece from "./Piece.vue"

export default {
  name: "PlayArea",
  props:{
  },
  data () {
    return {
      activePiece: {
        pos: {
          x: 100,
          y: 100
        },
        shape: "T",
        orientation: "up",
      },
      shapes: ["I", "O", "T", "S", "Z", "J", "L"],
      pieces: [],
      orientations: ["up", "right", "down", "left"],
    }
  },
  methods: {
    action: function (evt) {
      if (evt.key === "Space" || evt.code === "Space" ||
          evt.key === "ArrowUp" || evt.code === "ArrowUp") {
        this.rotate()
      } else if (evt.code === "ArrowRight" || evt.key === "ArrowRight") {
        this.moveLateral(1)
      } else if (evt.code === "ArrowLeft" || evt.key === "ArrowLeft") {
        this.moveLateral(-1)
      } else if (evt.code === "ArrowDown" || evt.key === "ArrowDown") {
        this.moveDown()
      }
    },
    rotate: function (evt) {
      let i = this.orientations.indexOf(this.activePiece.orientation) + 1
      if (i === this.orientations.length) {
        i = 0
      }
      this.activePiece.orientation = this.orientations[i]
    },
    move: function (evt) {
      
    },
    moveDown: function () {
      if (this.activePiece.pos.y + 80 === 800) {
        // stop
      }
      this.activePiece.pos.y += 1
    },
    moveLateral: function (d) {
      this.activePiece.pos.x += (40 * d)
    }
  },
  created: function () {
    window.addEventListener("keydown", this.action)
  },
  components: {
    Piece
  }
}
</script>

<style>
.playarea {
  position: relative;
  height: 800px;
  width: 400px;
  border: 1px solid grey;
  margin: 10px;
  background-color: white;
}
</style>
