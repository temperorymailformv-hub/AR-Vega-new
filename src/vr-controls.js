AFRAME.registerComponent('vr-controls', {
  init: function () {
    this.el.addEventListener('triggerdown', () => {
      this.teleport();
    });
    this.el.addEventListener('abuttondown', () => {
      this.switchSection();
    });
    this.el.addEventListener('xbuttondown', () => {
      this.switchSection();
    });
  },

  teleport: function () {
    const raycaster = this.el.components.raycaster;
    if (!raycaster) return;
    const intersections = raycaster.intersections;
    if (intersections.length > 0) {
      const point = intersections[0].point;
      const cameraRig = this.el.sceneEl.querySelector('#cameraRig');
      cameraRig.setAttribute('position', `${point.x} 1.6 ${point.z}`);
    }
  },

  switchSection: function () {
    const sceneManager = this.el.sceneEl.querySelector('#scene-root').components['scene-manager'];
    if (!sceneManager) return;
    const current = sceneManager.state.section;
    if (current === 'city') sceneManager.showSection('war');
    else if (current === 'war') sceneManager.showSection('merchant');
    else sceneManager.showSection('city');
  }
});
