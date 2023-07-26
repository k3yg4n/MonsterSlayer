function getRandomValue(min, max) {
  // Calculate a random number between min and max
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return { playerHealth: 100, monsterHealth: 100, currentRound: 0 };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    // Special attacks can only be used every 3 rounds
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.playerHealth = 0;
        alert("GAME OVER: The monster has defeated the player!");
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.monsterHealth = 0;
        alert("VICTORY: The monster has been defeated!");
      }
    },
  },
  methods: {
    playerAttack() {
      this.currentRound++;
      const dmg = getRandomValue(5, 12);
      this.monsterHealth -= dmg;
      this.monsterAttack(); // The monster attacks after the player attacks
    },
    monsterAttack() {
      const dmg = getRandomValue(8, 15);
      this.playerHealth -= dmg;
    },
    playerSpecialAttack() {
      this.currentRound++;
      const dmg = getRandomValue(10, 25);
      this.monsterHealth -= dmg;
      this.monsterAttack();
    },
  },
});

app.mount("#game");
