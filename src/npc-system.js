AFRAME.registerComponent('npc-behavior', {
  schema: {
    dialogue: { type: 'array', default: [] },
    waypoints: { type: 'array', default: [] },
    speed: { type: 'number', default: 0.7 }
  },

  init: function () {
    this.currentWaypoint = 0;
    this.waitTimer = 0;
    if (this.data.waypoints.length) {
      const pos = this.data.waypoints[0];
      this.el.setAttribute('position', `${pos.x} 0 ${pos.z}`);
    }
    this.el.classList.add('clickable');
    this.el.addEventListener('click', () => this.showDialogue());
  },

  tick: function (time, timeDelta) {
    if (!this.data.waypoints.length) { return; }
    if (this.waitTimer > 0) {
      this.waitTimer -= timeDelta / 1000;
      return;
    }
    const current = this.data.waypoints[this.currentWaypoint];
    const nextIndex = (this.currentWaypoint + 1) % this.data.waypoints.length;
    const next = this.data.waypoints[nextIndex];
    const position = this.el.object3D.position;
    const targetVec = new THREE.Vector3(next.x, 0, next.z);
    const step = this.data.speed * (timeDelta / 1000);
    position.lerp(targetVec, step);
    this.el.setAttribute('position', `${position.x} 0 ${position.z}`);
    if (position.distanceTo(targetVec) < 0.1) {
      this.currentWaypoint = nextIndex;
      this.waitTimer = 1.2;
    }
  },

  showDialogue: function () {
    const payload = { lines: this.data.dialogue.length ? this.data.dialogue : ['This person has nothing to say.'] };
    this.el.sceneEl.emit('show-dialogue', payload);
  }
});
