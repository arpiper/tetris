<template>
  <div class="piece" :class="shape" :style="pos">
    <span v-for="block in blocks"
      class="block"
      :style="blockStyle(block)">
    </span>
  </div>
</template>

<script>
export default {
  name: "piece",
  props: {
    shape: String,
    orientation: String,
    position: {
      x: 0,
      y: 0
    },
  },
  computed: {
    x: function () {
      return this.position.x
    },
    y: function () {
      return this.position.y
    },
    pos: function () {
      return {
        top: `${this.y}px`,
        left: `${this.x}px`,
      }
    }
  },
  data () {
    return {
      blocks: [0,1,2,3],
    }
  },
  methods: {
    blockStyle: function (block) {
      switch (this.shape) {
        case "I":
          return this.shapeI(block, this.orientation)
        case "O":
          return this.shapeO(block)
        case "T":
          return this.shapeT(block, this.orientation)
        case "S":
          return this.shapeS(block, this.orientation)
        case "Z":
          return this.shapeZ(block, this.orientation)
        case "J":
          return this.shapeJ(block, this.orientation)
        case "L":
          return this.shapeL(block, this.orientation)
      }
    },
    shapeI: function (block, orientation) {
      let top = (orientation === "up" || orientation === "down") ? block * 40 : 0
      let left = (orientation === "up" || orientation === "down") ? 0 : block * 40
      return {top: `${top}px`, left: `${left}px`}
    },
    shapeO: function (block) {
      return {
        top: `${(Math.floor(block / 2)) * 40}px`,
        left: `${(block % 2) * 40}px`
      }
    },
    shapeT: function (block, orientation) {
      let top, left
      if (orientation === "up" || orientation === "down") {
        left = (block - 1) * 40
        top = (orientation === "up") ? 40 : 0
        if (block === 0) {
          top = (top === 40) ? 0 : 40
          left = 40
        }
      } else if (orientation === "left" || orientation === "right") {
        top = (block - 1) * 40
        left = (orientation === "left") ? 40 : 0
        if (block === 0) {
          top = 40
          left = (left === 40) ? 0 : 40
        }
      }
      return {top: `${top}px`, left: `${left}px`}
    },
    shapeS: function (block, orientation) {
      let left = Math.ceil(block / 2) * 40
      let top = (Math.floor(block / 2) === 0) ? 40 : 0
      if (orientation === "up" || orientation === "down") {
        left = (Math.floor(block / 2) === 0) ? 40 : 0
        top = Math.ceil(block / 2) * 40
      }
      return {top: `${top}px`, left: `${left}px`}
    },
    shapeZ: function (block, orientation) {
      let top = (Math.floor(block / 2)) * 40
      let left = Math.ceil(block / 2) * 40
      if (orientation === "up" || orientation === "down") {
        left = (Math.floor(block / 2)) * 40
        top = Math.ceil(block / 2) * 40
      }       
      return {top: `${top}px`, left: `${left}px`}
    },
    shapeJ: function (block, orientation) {
      let top, left
      if (orientation === "up" || orientation === "down") {
        left = (block - 1) * 40
        top = (orientation === "up") ? 40 : 0
        if (block === 0) {
          top = (top === 40) ? 0 : 40
          left = (orientation === "up") ? 0 : 80
        }
      } else if (orientation === "left" || orientation === "right") {
        top = (block - 1) * 40
        left = (orientation === "left") ? 40 : 0
        if (block === 0) {
          top = (orientation === "left") ? 80 : 0
          left = (left === 40) ? 0 : 40
        }
      }
      return {top: `${top}px`, left: `${left}px`}
    },
    shapeL: function (block, orientation) {
      let top, left
      if (orientation === "up" || orientation === "down") {
        left = (block - 1) * 40
        top = (orientation === "up") ? 40 : 0
        if (block === 0) {
          top = (top === 40) ? 0 : 40
          left = (orientation === "up") ? 80 : 0
        }
      } else if (orientation === "left" || orientation === "right") {
        top = (block - 1) * 40
        left = (orientation === "left") ? 40 : 0
        if (block === 0) {
          top = (orientation === "left") ? 0 : 80
          left = (left === 40) ? 0 : 40
        }
      }
      return {top: `${top}px`, left: `${left}px`}
    },
  },
}
</script>

<style scoped>
.piece {
  position: absolute;
}
.block {
  position: absolute;
  height: 40px;
  width: 40px;
  border: 1px solid black;
}
.I .block {
  background-color: lightblue;
}
.O .block {
  background-color: yellow;
}
.T .block {
  background-color: purple;
}
.S .block {
  background-color: green;
}
.Z .block {
  background-color: red;
}
.J .block {
  background-color: blue;
}
.L .block {
  background-color: orange;
}
</style>
