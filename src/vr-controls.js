AFRAME.registerComponent('vr-controls', {
  init: function () {
    this.el.addEventListener('triggerdown', () => {
      this.switchSection();
    });
    this.el.addEventListener('abuttondown', () => {
      this.switchSection();
    });
    this.el.addEventListener('xbuttondown', () => {
      this.switchSection();
    });
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
