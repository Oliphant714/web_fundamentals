const character = {
	name: "Swamp Beast Diplomat",
	class: "Ambassador",
	level: 1,
	maxHealth: 100,
	health: 100,
	image: "images/snortleblat.png",
	statusMessage: "",
	attacked() {
		this.health = Math.max(0, this.health - 20);

		if (this.health === 0) {
			this.statusMessage = "The character has died.";
		} else {
			this.statusMessage = "The character was attacked.";
		}

		this.render();
	},
	heal() {
		this.health = Math.min(this.maxHealth, this.health + 10);
		this.statusMessage = "The character has rested.";
		this.render();
	},
	levelUp() {
		this.level += 1;
		this.health = this.maxHealth;
		this.statusMessage = "The character leveled up.";
		this.render();
	},
	render() {
		const nameElement = document.getElementById("character-name");
		const classElement = document.getElementById("character-class");
		const levelElement = document.getElementById("character-level");
		const healthElement = document.getElementById("character-health");
		const statusElement = document.getElementById("character-status");
		const attackButton = document.getElementById("attack-button");

		nameElement.textContent = this.name;
		classElement.textContent = `Class: ${this.class}`;
		levelElement.textContent = `Level: ${this.level}`;
		healthElement.textContent = `Health: ${this.health}`;
		statusElement.textContent = this.statusMessage;
		attackButton.disabled = this.health === 0;
	}
};

document.getElementById("attack-button").addEventListener("click", () => {
	character.attacked();
});

document.getElementById("heal-button").addEventListener("click", () => {
	character.heal();
});

document.getElementById("level-up-button").addEventListener("click", () => {
	character.levelUp();
});

character.render();
