const colorInput = document.getElementById("color");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function draw() {
  const template = new Image();

  template.onload = function() {
    const scale = Math.min(canvas.width / template.width, canvas.height / template.height);

    canvas.width = template.width * scale;
    canvas.height = template.height * scale;

    ctx.fillStyle = colorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      template,
      0,
      0,
      template.width,
      template.height,
      0,
      0,
      template.width * scale,
      template.height * scale
    );
  };

  template.src = "./template.png";
}

colorInput.addEventListener("change", () => draw());

draw();
