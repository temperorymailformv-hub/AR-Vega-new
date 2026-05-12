AFRAME.registerComponent('immersion-ui', {
  init: function () {
    const cameraRig = this.el.sceneEl.querySelector('#cameraRig');
    if (!cameraRig) { return; }

    const hud = document.createElement('a-entity');
    hud.setAttribute('id', 'hud-panel');
    hud.setAttribute('position', '0 -0.28 -0.8');
    hud.setAttribute('geometry', 'primitive: plane; width: 1.8; height: 0.45');
    hud.setAttribute('material', 'color: #241b15; opacity: 0.75');
    hud.setAttribute('rotation', '0 0 0');
    cameraRig.appendChild(hud);

    const subtitle = document.createElement('a-text');
    subtitle.setAttribute('id', 'subtitleText');
    subtitle.setAttribute('value', 'Press 1/2/3 to jump between sections. Click objects to interact.');
    subtitle.setAttribute('position', '0 0 0.01');
    subtitle.setAttribute('align', 'center');
    subtitle.setAttribute('color', '#f2e8c7');
    subtitle.setAttribute('width', '1.6');
    hud.appendChild(subtitle);

    this.el.sceneEl.addEventListener('show-dialogue', (event) => {
      const lines = event.detail && event.detail.lines ? event.detail.lines : [''];
      subtitle.setAttribute('value', lines.join(' '));
    });
  }
});
