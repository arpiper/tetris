<template>
  <div class="play-container">
    <div class="game-data">
      <div class="next-piece">
        <piece
          orientation="up"
          :position="{x: 20,y: 60}"
          shape="J">
        </piece>
      </div>
      <div>
        <span
          v-for="(a,i) in bottomLine">
          {{i}} - Left: {{ a.left }} x Top: {{ a.top }}<br />
        </span>
      </div>
      <div>
        {{ lastpiece }}
      </div>
      <div class="controls">
        <button class="start" @click="start">Start</button>
        <button class="pause" @click="pause">Pause</button>
      </div>
    </div>
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
      bottomLine: [
        {top: 800, left: 0},
        {top: 800, left: 40},
        {top: 800, left: 80},
        {top: 800, left: 120},
        {top: 800, left: 160},
        {top: 800, left: 200},
        {top: 800, left: 240},
        {top: 800, left: 280},
        {top: 800, left: 320},
        {top: 800, left: 360},
      ],
      lastpiece: undefined,
      interval: undefined,
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
        if (this.activePiece.shape === "Z" || 
            this.activePiece.shape ===" S") {
          return {w: 80, h: 120}
        }
        return {w: 120, h: 80}
      } else {
        if (this.activePiece.shape === "I") {
          return {w: 160, h: 40}
        } 
        if (this.activePiece.shape === "Z" ||
            this.activePiece.shape === "S") {
          return {w: 120, h: 80}
        }
        return {w: 80, h: 120}
      }
    },
    bottom: function () {
      let idx = this.activePiece.pos.x / 40
      let b = this.bottomLine[idx].top
      let w = this.pieceSize.w / 40
      let x
      for (var i = 1; i < w; i++) {
        if (this.bottomLine[idx + i].top < b) { // may need index out of bounds chekcing
          b = this.bottomLine[idx + i].top
          x = idx + i
        }
      }
      console.log("index", x, b)
      return b 
    },
    activePieceY: function () {
      return this.activePiece.pos.y
    },
  },
  methods: {
    setPiece: function () {
      let p = JSON.parse(JSON.stringify(this.activePiece))
      p.size = this.pieceSize
      this.lastpiece = p
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
      if (["Space", "ArrowUp", "ArrowRight", "ArrowLeft", "ArrowDown"].includes(evt.key)) {
        evt.preventDefault()
        evt.stopPropagation()
      }
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
    moveDown: function (stepsize = 1) {
      this.activePiece.pos.y += stepsize
    },
    moveLateral: function (d) {
      if (this.activePiece.pos.x > 0 && d === -1) {
        this.activePiece.pos.x += (40 * d)
      } else if ((this.activePiece.pos.x + this.pieceSize.w) < 400 && d === 1) {
        this.activePiece.pos.x += (40 * d)
      }
    },
    quickDown: function () {
      let cols = this.getColHeight()
      let idx = (this.activePiece.pos.x) / 40
      for (var i = 0; i < cols.length; i++) {
        this.bottomLine[idx + i].top -= cols[i]
      }
      console.log(cols)
      this.activePiece.pos.y = this.bottom //- this.pieceSize.h
    },
    setPositions: function (p) {
      this.activePiece.blocks = JSON.parse(JSON.stringify(p))
    },
    getColHeight: function () {
      let c = []
      for (var i = 0; i < 4; i++) {
        let idx = parseInt(this.activePiece.blocks[i].left) / 40
        if (c[idx]) {
          c[idx] += 40
        } else {
          c[idx] = 40
        }
      }
      return c
    },
    adjustBottom: function (b) {
      let vm = this
      b.forEach(function (v) {
        let idx = parseInt(v.style.left) / 40
        if (parseInt(v.style.top) < vm.bottomLine[idx].top) { 
          vm.bottomLine[idx].top = parseInt(v.style.top)
        }
      })
    },
    start: function () {
      let stepsize = 1
      this.interval = window.setInterval(this.moveDown, 50, stepsize)
    },
    pause: function () {
      window.clearInterval(this.interval)
    },
    reset: function () {
    }
  },
  watch: {
    activePieceY: function (value) {
      if ((value + this.pieceSize.h) === this.bottom || 
          value === this.bottom) {
        this.setPiece()
        this.nextPiece()
        if (this.activePiece) {
        }
      }
    }
  },
  created: function () {
    this.evtHub.$on("position_changed", this.setPositions)
    this.evtHub.$on("adjust_bottom", this.adjustBottom)
    window.addEventListener("keydown", this.action)
  },
  components: {
    Piece,
    PlayedPieces
  }
}
</script>

<style>
.play-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.playarea {
  position: relative;
  height: 800px;
  width: 400px;
  border: 1px solid grey;
  margin: 10px;
  background-color: white;
  box-sizing: content-box;
}
.game-data {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 10px;
}
.controls button {
  width: 75px;
  height: 25px;
  margin-top: auto;
  font-weight: bold;
  background-color: #4caf50;
  border: 2px solid #4caf50;
  padding: 5px;
}
.controls button:hover {
  background-color: white;
  border: 2px solid #4caf50;
  cursor: pointer;
}
.controls button:active {
  opacity: 0.5;
  background-color: #4caf50;
}
:focus {
  outline: none;
}
</style>
