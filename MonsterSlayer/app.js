function getRandomValue(min, max) {
  // Calculate a random number between min and max
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return { playerHealth: 100, monsterHealth: 100 };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        alert("GAME OVER: The monster has defeated the player!");
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        alert("VICTORY: The monster has been defeated!");
      }
    },
  },
  methods: {
    playerAttack() {
      console.log("Player attack!");
      this.monsterHealth -= getRandomValue(5, 12);
      this.monsterAttack(); // The monster attacks after the player attacks
    },
    monsterAttack() {
      console.log("Monster attack!");
      this.playerHealth -= getRandomValue(8, 15);
    },
  },
});

app.mount("#game");
