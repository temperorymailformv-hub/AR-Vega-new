window.HistoricalData = {
  marketGoods: [
    {name: 'Spices', region: 'Deccan', basePrice: 18, description: 'Cardamom, black pepper and cinnamon from coastal plantations.'},
    {name: 'Silk', region: 'Takshashila', basePrice: 120, description: 'Handwoven silk textiles favored by nobles.'},
    {name: 'Copper Utensils', region: 'Magadha', basePrice: 35, description: 'Copper and bronze cookware for home and temple use.'},
    {name: 'Scrolls', region: 'Pataliputra', basePrice: 90, description: 'Scholarly manuscripts from the city of royal academies.'}
  ],
  npcDefinitions: [
    {
      name: 'Saffron Merchant',
      role: 'Merchant',
      dialogue: ['Welcome to the market, traveler.', 'The finest saffron and spices from the south.'],
      waypoints: [{x: -3, y: 0, z: -7}, {x: -1, y: 0, z: -6}],
      color: '#b35900'
    },
    {
      name: 'Temple Priest',
      role: 'Priest',
      dialogue: ['May the river bless your journey.', 'Offer yourself to the fire with care.'],
      waypoints: [{x: 2, y: 0, z: -9}, {x: 4, y: 0, z: -8}],
      color: '#d9d9c2'
    },
    {
      name: 'Caravan Captain',
      role: 'Traveler',
      dialogue: ['The roads are busy this season.', 'Silk and precious metals move along old trade routes.'],
      waypoints: [{x: -6, y: 0, z: -12}, {x: -8, y: 0, z: -10}],
      color: '#666666'
    }
  ],
  warEvents: [
    {
      title: 'Strategic Council',
      summary: 'Royal commanders discuss troop deployment and supply corridors before the campaign.',
      position: {x: 32, y: 0, z: -5}
    },
    {
      title: 'Elephant Brigade',
      summary: 'A line of war elephants marches along the edge of the battlefield.',
      position: {x: 36, y: 0, z: -2}
    }
  ],
  merchantGoals: [
    {title: 'Build Reputation', description: 'Fulfill transactions and assist nobles to grow trust in your house.'},
    {title: 'Expand Trade', description: 'Buy regional goods and sell them in richer districts for profit.'}
  ]
};
