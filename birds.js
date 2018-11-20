function Bird(WIDTH, HEIGHT, world) {
	// Private
	var self = this;

	// Public
	this.ID = guid(); // Random ID

	this.world = world;

	this.position = new Vector2D(randi(0, WIDTH), randi(0, HEIGHT));
	this.direction = new Vector2D(randi(-1, 2), randi(-1, 2));

	this.gender = randi(0, 1); // 0 = female, 1 = male

	this.age = 0;
	this.death = randf(1, 5); // Age of death

	this.ails = randf(0, 0.1); // Tweak this

	this.maxHealth = Math.round(128 - 128 * this.ails); // Or the 128 in this

	this.health = this.maxHealth;

	this.fertility = randf(0, 1); // Likelyhood of producing offspring

	this.diseased = Math.random() < 0.05; // 5 in 100
	this.dormant = true; // Disease is dormant!

	this.minMAge = randi(13, 18); // Minimum mating age
	this.mAgeSpan = randi(40, 50); // Bird can mate from minMAge to minMAge + this value

	this.mate = null; // When mate found, set this to the ID of mate

	this.pregnant = false;
	this.precnancy = 9;

	this.looks = randf(0, 1); // Appearance rating
	this.monies = randi(0, 100); // Cash

	this.infertile = function() {
		return Math.random() < 0.9; // Return true if 10%
	}

	this.mature = function() {
		return !self.infertile() && self.age >= self.minMAge && self.age <= (self.minMAge + self.mAgeSpan); // Returns true if NOT infirtile and between the mating age range
		// the fertitliy will come in use later on
	}

	this.update = function() {
		self.age += 1 / 12 / FPS;

		if(self.pregnant != false) { // If pregant not false
			self.pregnancy -= 1 / FPS;
		}

		if(self.pregnant != false && self.pregnancy <= 0) { // Cake is baked!
			if(self.gender == 1) {
				var mate = self.world.getMate(self.mate);

			}
			self.pregnant = false;
		}

		self.move();
	}

	this.move = function() {
		self.position.plusEq(self.direction);
		direction = new Vector2D(randi(-1, 2), randi(-1, 2));

		if(self.position.x < 0) self.position.x = WIDTH;
		if(self.position.x > WIDTH) self.position.x = 0;
		if(self.position.y < 0) self.position.y = HEIGHT;
		if(self.position.y > HEIGHT) self.position.y = 0;
	}

	this.draw = function() {
		var ctx = self.world.ctx;

		ctx.fillStyle = "#A4C639";
		ctx.beginPath();
		ctx.arc(self.position.x, self.position.y, 5, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = "#000";
		ctx.fillText("Age: " + self.age.toFixed(2), self.position.x - 2.5, self.position.y + 5.5);
		if (self.gender == 0) {
			ctx.fillText("Preg: " + (self.pregnant != false ? self.pregnant.toFixed(2) : "false"), self.position.x - 2.5, self.position.y + 15.5);
		}
		ctx.fillText("Cash: " + self.monies.toFixed(2), self.position.x - 2.5, self.position.y + 25.5);
		ctx.fillText("Looks: " + self.looks.toFixed(2), self.position.x - 2.5, self.position.y + 35.5);
		ctx.fillText("Death: " + self.death.toFixed(2), self.position.x - 2.5, self.position.y + 45.5);

		self.update();
	}
}
