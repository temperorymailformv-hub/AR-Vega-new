AFRAME.registerSystem('merchant-system', {
  init: function () {
    this.state = {
      balance: 150,
      reputation: 42,
      inventory: {
        Spices: 8,
        Silk: 1,
        Scrolls: 2
      }
    };
    this.sceneEl = document.querySelector('a-scene');
    this.updateUI();
  },

  updateUI: function () {
    const panel = this.sceneEl.querySelector('#merchant-status');
    if (!panel) { return; }
    const text = `Wealth: ${this.state.balance} silver\nReputation: ${this.state.reputation}\nInventory:\n- Spices: ${this.state.inventory.Spices}\n- Silk: ${this.state.inventory.Silk}\n- Scrolls: ${this.state.inventory.Scrolls}`;
    panel.setAttribute('text', 'value', text);
  },

  sellItem: function (item) {
    if (this.state.inventory[item] > 0) {
      const price = window.HistoricalData.marketGoods.find((good) => good.name === item)?.basePrice || 10;
      this.state.balance += price;
      this.state.inventory[item] -= 1;
      this.state.reputation += 1;
      this.updateUI();
      this.sceneEl.emit('show-dialogue', { lines: [`You sold 1 ${item} for ${price} silver.`] });
    } else {
      this.sceneEl.emit('show-dialogue', { lines: [`You have no ${item} left to sell.`] });
    }
  }
});

AFRAME.registerComponent('merchant-console', {
  init: function () {
    this.el.classList.add('clickable');
    this.el.addEventListener('click', () => {
      const system = this.el.sceneEl.systems['merchant-system'];
      system.sellItem('Spices');
    });
  }
});
