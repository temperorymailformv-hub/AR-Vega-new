AFRAME.registerComponent('war-system', {
  init: function () {
    this.scene = this.el.sceneEl;
    this.createTacticalMap();
  },

  createTacticalMap: function () {
    const mapPanel = document.createElement('a-entity');
    mapPanel.setAttribute('geometry', 'primitive: plane; width: 3.2; height: 1.4');
    mapPanel.setAttribute('material', 'color: #2d2a20; opacity: 0.95');
    mapPanel.setAttribute('position', '32 2 -6');
    mapPanel.setAttribute('rotation', '-20 0 0');
    this.el.appendChild(mapPanel);

    const title = document.createElement('a-text');
    title.setAttribute('value', 'Tactical Map');
    title.setAttribute('position', '0 0.5 0.01');
    title.setAttribute('align', 'center');
    title.setAttribute('color', '#fff');
    title.setAttribute('width', '2.8');
    mapPanel.appendChild(title);

    const guide = document.createElement('a-text');
    guide.setAttribute('value', 'Tap each marker to read historic context.');
    guide.setAttribute('position', '0 0.1 0.01');
    guide.setAttribute('align', 'center');
    guide.setAttribute('color', '#d6c49f');
    guide.setAttribute('width', '2.8');
    mapPanel.appendChild(guide);
  }
});
