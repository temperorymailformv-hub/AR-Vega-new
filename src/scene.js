AFRAME.registerComponent('scene-manager', {
  init: function () {
    this.scene = this.el.sceneEl;
    this.state = { section: 'city' };
    this.createSections();
    this.bindInput();
    this.el.sceneEl.addEventListener('loaded', () => {
      this.showSection('city');
    });
  },

  createSections: function () {
    this.createCitySection();
    this.createWarSection();
    this.createMerchantSection();
  },

  bindInput: function () {
    window.addEventListener('keydown', (event) => {
      if (event.key === '1') this.showSection('city');
      if (event.key === '2') this.showSection('war');
      if (event.key === '3') this.showSection('merchant');
    });
  },

  showSection: function (section) {
    this.state.section = section;
    const cameraRig = this.scene.querySelector('#cameraRig');
    const subtitles = this.scene.querySelector('#subtitleText');

    if (cameraRig) {
      if (section === 'city') {
        cameraRig.setAttribute('position', '0 1.6 5');
      }
      if (section === 'war') {
        cameraRig.setAttribute('position', '30 1.6 5');
      }
      if (section === 'merchant') {
        cameraRig.setAttribute('position', '-30 1.6 5');
      }
    }

    if (subtitles) {
      if (section === 'city') {
        subtitles.setAttribute('value', 'Section 1: Explore the market district and talk to merchants.');
      }
      if (section === 'war') {
        subtitles.setAttribute('value', 'Section 2: Observe war planning and battlefield strategy.');
      }
      if (section === 'merchant') {
        subtitles.setAttribute('value', 'Section 3: Experience life as a merchant and manage your trade.');
      }
    }

    this.toggleSectionVisibility('city-section', section === 'city');
    this.toggleSectionVisibility('war-section', section === 'war');
    this.toggleSectionVisibility('merchant-section', section === 'merchant');
  },

  toggleSectionVisibility: function (id, visible) {
    const section = this.el.querySelector(`#${id}`);
    if (section) section.setAttribute('visible', visible);
  },

  createCitySection: function () {
    const root = document.createElement('a-entity');
    root.setAttribute('id', 'city-section');
    root.setAttribute('position', '0 0 -10');
    root.setAttribute('visible', 'true');
    this.el.appendChild(root);

    const market = document.createElement('a-entity');
    market.setAttribute('position', '0 0 0');
    root.appendChild(market);

    this.createMarketStall(market, -2, 0, -4, 'Spice Stall');
    this.createMarketStall(market, 2, 0, -4, 'Silk Drapery');
    this.createMarketStall(market, 0, 0, -7, 'Scroll Shop');

    window.HistoricalData.npcDefinitions.forEach((npcDef) => {
      const npc = document.createElement('a-entity');
      npc.setAttribute('geometry', 'primitive: cylinder; radius: 0.35; height: 1.4');
      npc.setAttribute('material', `color: ${npcDef.color}`);
      npc.setAttribute('npc-behavior', {
        dialogue: npcDef.dialogue,
        waypoints: npcDef.waypoints,
        speed: 0.7
      });
      npc.setAttribute('position', `${npcDef.waypoints[0].x} 0 ${npcDef.waypoints[0].z}`);
      market.appendChild(npc);

      const nameTag = document.createElement('a-text');
      nameTag.setAttribute('value', npcDef.name);
      nameTag.setAttribute('position', '0 0.9 0');
      nameTag.setAttribute('align', 'center');
      nameTag.setAttribute('color', '#fff');
      nameTag.setAttribute('side', 'double');
      nameTag.setAttribute('scale', '1 1 1');
      npc.appendChild(nameTag);
    });

    const river = document.createElement('a-box');
    river.setAttribute('position', '0 0.05 -15');
    river.setAttribute('width', '25');
    river.setAttribute('height', '0.1');
    river.setAttribute('depth', '6');
    river.setAttribute('material', 'color: #3f7ab8; opacity: 0.85');
    market.appendChild(river);

    const prayer = document.createElement('a-cylinder');
    prayer.setAttribute('position', '-6 0.6 -2');
    prayer.setAttribute('radius', '0.75');
    prayer.setAttribute('height', '1.2');
    prayer.setAttribute('material', 'color: #e0b86e');
    market.appendChild(prayer);
  },

  createWarSection: function () {
    const root = document.createElement('a-entity');
    root.setAttribute('id', 'war-section');
    root.setAttribute('position', '30 0 -10');
    root.setAttribute('visible', 'false');
    this.el.appendChild(root);

    const ground = document.createElement('a-plane');
    ground.setAttribute('rotation', '-90 0 0');
    ground.setAttribute('width', '20');
    ground.setAttribute('height', '28');
    ground.setAttribute('color', '#7e6b4c');
    root.appendChild(ground);

    window.HistoricalData.warEvents.forEach((event) => {
      const marker = document.createElement('a-entity');
      marker.setAttribute('position', `${event.position.x} 0 ${event.position.z}`);
      const flag = document.createElement('a-box');
      flag.setAttribute('height', '2');
      flag.setAttribute('width', '0.15');
      flag.setAttribute('depth', '0.15');
      flag.setAttribute('color', '#852a1e');
      marker.appendChild(flag);

      const sign = document.createElement('a-text');
      sign.setAttribute('value', event.title);
      sign.setAttribute('position', '0 1 0');
      sign.setAttribute('align', 'center');
      sign.setAttribute('color', '#fff');
      sign.setAttribute('scale', '1 1 1');
      marker.appendChild(sign);
      marker.classList.add('clickable');
      marker.addEventListener('click', () => {
        this.scene.emit('show-dialogue', { lines: [event.summary] });
      });
      root.appendChild(marker);
    });
  },

  createMerchantSection: function () {
    const root = document.createElement('a-entity');
    root.setAttribute('id', 'merchant-section');
    root.setAttribute('position', '-30 0 -10');
    root.setAttribute('visible', 'false');
    this.el.appendChild(root);

    const table = document.createElement('a-box');
    table.setAttribute('position', '-30 0.5 -8');
    table.setAttribute('width', '6');
    table.setAttribute('height', '0.8');
    table.setAttribute('depth', '3');
    table.setAttribute('material', 'color: #8b5a2b');
    root.appendChild(table);

    const ledger = document.createElement('a-entity');
    ledger.setAttribute('geometry', 'primitive: plane; width: 4; height: 1.6');
    ledger.setAttribute('material', 'color: #fde9c4; opacity: 0.95');
    ledger.setAttribute('position', '-30 1.55 -7.5');
    ledger.setAttribute('rotation', '-20 0 0');
    ledger.setAttribute('merchant-console', '');
    ledger.setAttribute('id', 'merchant-status');
    root.appendChild(ledger);
  },

  createMarketStall: function (root, x, y, z, label) {
    const stall = document.createElement('a-box');
    stall.setAttribute('position', `${x} ${y + 0.6} ${z}`);
    stall.setAttribute('width', '2.4');
    stall.setAttribute('height', '1.2');
    stall.setAttribute('depth', '1.4');
    stall.setAttribute('color', '#c47b3d');
    stall.classList.add('clickable');
    stall.addEventListener('click', () => {
      this.scene.emit('show-dialogue', { lines: [`Inspecting ${label}. Tap merchants for conversation.`] });
    });
    root.appendChild(stall);

    const text = document.createElement('a-text');
    text.setAttribute('value', label);
    text.setAttribute('position', `${x} ${y + 1.3} ${z}`);
    text.setAttribute('color', '#fff');
    text.setAttribute('align', 'center');
    root.appendChild(text);
  }
});
