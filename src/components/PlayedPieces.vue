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
      used_spaces: [],
    }
  },
  methods: {
    addPiece: function (piece) {
      let t, l, x, y, n
      let bottom = []
      let spaces = []
      let conflict = false
      for (let i = 0; i < 4; i++) {
        t = piece.pos.y + parseInt(piece.blocks[i].top)
        l = piece.pos.x + parseInt(piece.blocks[i].left)
        x = l / 40
        y = (760 - t) / 40
        n = x + (10 * y)
        if (this.used_spaces.includes(n)) {
          // console.log("piece overlap", n)
          piece.pos.y -= 40
          conflict = true
          break
        } else {
          spaces.push(n)
          bottom.push({
            style: {top: `${t}px`, left: `${l}px`},
            shape: piece.shape,
            orientation: piece.orientation,
            coordinates: [x, y],
            number: n
          })
        }
      }
      if (conflict) {
        this.addPiece(piece)
      } else {
        this.blocks = this.blocks.concat(bottom)
        this.used_spaces = this.used_spaces.concat(spaces).sort( (a,b) => {
          if (a < b) {
            return -1
          } else if (a > b) {
            return 1
          }
          return 0
        })
        this.evtHub.$emit("adjust_bottom", bottom)
      }
    },
    moveBlocksDown: function (b) {
      // console.log(b)
      let vm = this
      b.forEach(function (v,i) {
        let j = vm.blocks.indexOf(v)
        let h = vm.used_spaces.indexOf(vm.blocks[j].number)
        vm.blocks[j].style.top = `${parseInt(vm.blocks[j].style.top) + 40}px`
        vm.blocks[j].coordinates[1] -= 1
        vm.blocks[j].number -= 10
        vm.used_spaces[h] -= 10
      })
      this.evtHub.$emit("row_cleared")
    },
    getShape: function (s, o) {
    },
    clearRow: function (row, index) {
      let t = this.used_spaces.splice(index, 10)
      // console.log("clearrow", row, t)
      let above = []
      for (var i = 0; i < this.blocks.length; i++) {
        if (t.includes(this.blocks[i].number)) {
          this.blocks.splice(i, 1)
          i--
        } else if (this.blocks[i].number > (row * 10 + 9)) {
          above.push(this.blocks[i])
        }
      }
      this.moveBlocksDown(above)
      // console.log(above)
    }
  },
  watch: {
    pieces: function (value) {
      this.addPiece(value[value.length - 1])
    },
    used_spaces: function (value) {
      let r = value.length / 10
      let count = 0
      let last = 0
      /*for (var i = 0; i < r; i++) {
        let idx = (i * 10) + 9
        if (value[idx] === idx) {
          this.clearRow(i)
        }
      }*/
      let n = this.used_spaces.length
      for (var i = 0; i < n; i++) {
        if (last === value[i] - 1) { // current == prev
          count++
          console.log(value[i])
          if (count === 10) {
            console.log("row to clear", Math.floor(value[i] / 10))
            this.clearRow(Math.floor(value[i] / 10), i - 9)
            count = 0
          }
        } else {
          count = 0
        }
        last = value[i]
      }
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
