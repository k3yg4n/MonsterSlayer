function getRandomValue(min, max) {
  // Calculate a random number between min and max
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    // Special attacks can only be used every 3 rounds
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player has lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player has won
        this.winner = "player";
      }
    },
  },
  methods: {
    playerAttack() {
      this.currentRound++;
      const dmg = getRandomValue(5, 12);
      this.monsterHealth -= dmg;
      this.addLogMessage("player", "attack", dmg);
      this.monsterAttack(); // The monster attacks after the player attacks
    },
    monsterAttack() {
      const dmg = getRandomValue(8, 15);
      this.playerHealth -= dmg;
      this.addLogMessage("monster", "attack", dmg);
    },
    playerSpecialAttack() {
      this.currentRound++;
      const dmg = getRandomValue(10, 25);
      this.monsterHealth -= dmg;
      this.addLogMessage("player", "special attack", dmg);
      this.monsterAttack();
    },
    playerHeal() {
      this.currentRound++;
      const healAmount = getRandomValue(8, 20);
      // The player cannot increase their HP past 100
      if (this.playerHealth + healAmount > 100) {
        this.playerHealth = 100;
        this.addLogMessage("player", "heal", 0);
      } else {
        this.playerHealth += healAmount;
        this.addLogMessage("player", "heal", healAmount);
      }
      this.monsterAttack();
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    playerSurrender() {
      this.winner = "monster";
    },
    addLogMessage(subject, action, value) {
      this.logMessages.unshift({
        actionBy: subject,
        actionType: action,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
