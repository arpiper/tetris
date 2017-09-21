<template>
  <div id="app">
    <div class="">
      <!--piece 
        v-for="(p,i) in pieces"
        :key="i"
        :shape="p"
        :position="{y: 160*i, x: 0}"
        orientation="up">
      </piece-->
    </div>
    <div class="next-piece">
      <piece
        orientation="up"
        :position="{x: 20,y: 60}"
        shape="J">
      </piece>
    </div>
    <PlayArea></PlayArea>
  </div>
</template>

<script>
import PlayArea from "./components/PlayArea.vue"
import Piece from "./components/Piece.vue"

export default {
  name: 'app',
  data () {
    return {
      pieces: ["I", "O", "T", "S", "Z", "J", "L"],
    }
  },
  methods: {
  },
  components: {
    PlayArea,
    Piece,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: grey;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.next-piece {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: #dedede;
  position: relative;
}
.next-piece div.piece {
}
</style>
