<template>
  <div class="playarea">
    <piece 
      :orientation="activePiece.orientation"
      :position="activePiece.pos" 
      :shape="activePiece.shape">
    </piece>
    <!--piece
      v-for="(p,i) in pieces"
      :key="i"
      :shape="p.shape"
      :position="p.pos"
      :orientation="p.orientation">
    </piece-->
    <played-pieces
      :pieces="pieces">
    </played-pieces>
  </div>
</template>

<script>
import Piece from "./Piece.vue"
import PlayedPieces from "./PlayedPieces.vue"

export default {
  name: "PlayArea",
  props:{
  },
  data () {
    return {
      activePiece: {
        pos: {
          x: 120,
          y: 0
        },
        shape: "T",
        blocks: [],
        orientation: "up",
      },
      shapes: ["I", "O", "T", "S", "Z", "J", "L"],
      pieces: [],
      orientations: ["up", "right", "down", "left"],
    }
  },
  computed: {
    pieceSize: function () {
      if (this.activePiece.shape === "O") {
        return {w: 80, h: 80}
      }
      if (this.activePiece.orientation === "up" || this.activePiece.orientation === "down") {
        if (this.activePiece.shape === "I") {
          return {w: 40, h: 160}
        }         
        if (this.activePiece.shape === "T") {
          return {w: 120, h: 80}
        }
        return {w: 80, h: 120}
      } else {
        if (this.activePiece.shape === "I") {
          return {w: 160, h: 40}
        } else if (this.activePiece.shape === "T") {
          return {w: 80, h: 120}
        }
        return {w: 120, h: 80}
      }
    },
    bottom: function () {
      if (this.pieces.length === 0) {
        return 800
      }
      let b = 800
      let x = this.activePiece.pos.x
      let vm = this
      this.pieces.forEach(function (v,i) {
        if (v.pos.x === x) {
          b -= v.size.h
        }
      })
      return b
    }
  },
  methods: {
    setPiece: function () {
      let p = JSON.parse(JSON.stringify(this.activePiece))
      p.size = this.pieceSize
      this.pieces.push(p)
    },
    nextPiece: function () {
      let i = Math.floor(Math.random() * this.shapes.length)
      let p = {
        shape: this.shapes[i],
        pos: {x: 120, y: 0},
        orientation: "up",
      }
      this.activePiece = JSON.parse(JSON.stringify(p))
    },
    action: function (evt) {
      if (evt.key === "Space" || evt.code === "Space" ||
          evt.key === "ArrowUp" || evt.code === "ArrowUp") {
        this.rotate()
      } else if (evt.code === "ArrowRight" || evt.key === "ArrowRight") {
        this.moveLateral(1)
      } else if (evt.code === "ArrowLeft" || evt.key === "ArrowLeft") {
        this.moveLateral(-1)
      } else if (evt.code === "ArrowDown" || evt.key === "ArrowDown") {
        if (evt.ctrlKey) {
          this.quickDown()
        } else {
          this.moveDown()
        }
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
      if ((this.activePiece.pos.y + this.pieceSize.h) === this.bottom) {
        this.setPiece()
        this.nextPiece()
      }
      this.activePiece.pos.y += 1
    },
    moveLateral: function (d) {
      if (this.activePiece.pos.x > 0 && d === -1) {
        this.activePiece.pos.x += (40 * d)
      } else if ((this.activePiece.pos.x + this.pieceSize.w) < 400 && d === 1) {
        this.activePiece.pos.x += (40 * d)
      }
    },
    quickDown: function () {
      this.activePiece.pos.y = this.bottom - this.pieceSize.h
      this.setPiece()
      this.nextPiece()
    },
    setPositions: function (p) {
      this.activePiece.blocks = JSON.parse(JSON.stringify(p))
    }
  },
  created: function () {
    this.evtHub.$on("position_changed", this.setPositions)
    window.addEventListener("keydown", this.action)
  },
  components: {
    Piece,
    PlayedPieces
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
  box-sizing: content-box;
}
</style>
