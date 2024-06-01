const input = document
  .getElementById("audio")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const arraybuffer = event.target.result;
      const audiocontext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audiocontext.decodeAudioData(arraybuffer, (audiobuffer) => {
        visualize(audiobuffer);
      });
    });
    reader.readAsArrayBuffer(file);
  });

function visualize(audiobuffer) {
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 200;

  const canvascontext = canvas.getContext("2d");
  const channeldata = audiobuffer.getChannelData(0);

  let numberofchunks = 400;
  const chunksize = Math.ceil(channeldata.length / numberofchunks);
  canvascontext.fillStyle = "#5271FF";

  const center = canvas.height / 2;
  const barwidth = canvas.width / numberofchunks;

  for (let i = 0; i < numberofchunks; i++) {
    const chunk = channeldata.slice(i * chunksize, (i + 1) * chunksize);

    const min = Math.min(...chunk)*20;
    const max = Math.max(...chunk)*20;

    canvascontext.fillRect(i*barwidth,center-max,barwidth,max+Math.abs(min))
  }
}
