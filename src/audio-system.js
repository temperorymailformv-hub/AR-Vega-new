AFRAME.registerComponent('audio-system', {
  init: function () {
    const ambience = document.createElement('a-entity');
    ambience.setAttribute('sound', 'src: #marketAmbience; autoplay: true; loop: true; volume: 0.35');
    this.el.appendChild(ambience);

    const music = document.createElement('a-entity');
    music.setAttribute('sound', 'src: url(https://cdn.aframe.io/basic-guide/audio/music-ambient.ogg); autoplay: true; loop: true; volume: 0.22');
    this.el.appendChild(music);
  }
});
