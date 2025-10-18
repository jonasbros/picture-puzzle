<template>
  <div id="puzzle-area">
    <h2>PUZZLE</h2>

    <div id="puzzle-area__container">
      <div id="puzzle-area__board">
        <div
          v-for="puzzlePiece in puzzlePieces"
          :key="`puzzle-item-${puzzlePiece.id}`"
          class="puzzle-area__piece"
          :class="`puzzle-piece--position-${puzzlePiece.position}`"
          :style="`--puzzle-bg-image: url('${imageSrc}')`"
          draggable="true"
          @dragstart="startDrag($event, puzzlePiece)"
          @drop.prevent="onDrop($event, puzzlePiece)"
          @dragenter.prevent
          @dragover.prevent
        ></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PuzzleArea',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    puzzlePieces: [],
    solution: '',
    isSolved: false,
  }),

  mounted() {
    this.setupPuzzle();
  },

  methods: {
    setupPuzzle() {
      this.createPuzzleItems();
      this.shufflePuzzle();
    },

    createPuzzleItems() {
      for(let i = 1; i <= 9; i++) {
        this.puzzlePieces.push({
          id: i,
          position: i,
          correctPosition: i,
        });
      }

      this.solution = JSON.stringify(this.puzzlePieces);
    },

    shufflePuzzle() {
      // make array [1,2,3,4,5,6,7,8,9]
      const positions = Array.from({ length: 9 }, (_, i) => i + 1);

      // shuffle it (Fisher–Yates)
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }

      // assign each shuffled position
      this.puzzlePieces = this.puzzlePieces.map((item, index) => ({
        ...item,
        position: positions[index],
      }));
    },

    startDrag(event, draggedPiece) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('draggedPiece', JSON.stringify(draggedPiece));
    },

    onDrop(event, targetPiece) {
      const draggedPiece = JSON.parse(event.dataTransfer.getData('draggedPiece'));
      if (draggedPiece.id === targetPiece.id) return;

      this.swapPositions(draggedPiece, targetPiece);
    },

    swapPositions(draggedPiece, targetPiece) {
      const draggedIndex = this.puzzlePieces.findIndex(item => item.id === draggedPiece.id);
      const targetIndex = this.puzzlePieces.findIndex(item => item.id === targetPiece.id);

      const tempPosition = this.puzzlePieces[draggedIndex].position;
      this.$set(this.puzzlePieces[draggedIndex], 'position', this.puzzlePieces[targetIndex].position);
      this.$set(this.puzzlePieces[targetIndex], 'position', tempPosition);

      this.checkWinCondition();
    },
    
    checkWinCondition() {
      const currentState = JSON.stringify(this.puzzlePieces);
      this.isSolved = currentState === this.solution;
      if (this.isSolved) {
        setTimeout(() => {
          this.$router.push('congrats');
        }, 500);
      }
    },
  },
}
</script>

<style scoped>
#puzzle-area__container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
}

#puzzle-area__board {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  border: 2px solid black;
}

.puzzle-area__piece {
  --puzzle-bg-image: url('');
  width: 33.33%;
  height: 33.33%;
  box-sizing: border-box;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: var(--puzzle-bg-image), url('../assets/error.jpg');
  background-size: 300% 300%;
}

.puzzle-piece--position-1 {
  background-position: 0% 0%;
}

.puzzle-piece--position-2 {
  background-position: 50% 0%;
}

.puzzle-piece--position-3 {
  background-position: 100% 0%;
}

.puzzle-piece--position-4 {
  background-position: 0% 50%;
}

.puzzle-piece--position-5 {
  background-position: 50% 50%;
}

.puzzle-piece--position-6 {
  background-position: 100% 50%;
}

.puzzle-piece--position-7 {
  background-position: 0% 100%;
}

.puzzle-piece--position-8 {
  background-position: 50% 100%;
}

.puzzle-piece--position-9 {
  background-position: 100% 100%;
}
</style>