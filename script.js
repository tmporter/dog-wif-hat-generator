const colorInput = document.getElementById("color");
const saveButton = document.getElementById("save");
const imageElement = document.getElementById("image");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function draw() {
  const template = new Image();
  template.crossOrigin = "anonymous";

  const multiply = new Image();
  multiply.crossOrigin = "anonymous";

  template.onload = function() {
    multiply.onload = function() {
      const scale = Math.min(canvas.width / template.width, canvas.height / template.height);

      canvas.width = template.width * scale;
      canvas.height = template.height * scale;

      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(
        multiply,
        0,
        0,
        template.width,
        template.height,
        0,
        0,
        template.width * scale,
        template.height * scale
      );

      ctx.fillStyle = colorInput.value;
      ctx.globalCompositeOperation = "multiply";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";
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

      // render canvas to <img/>
      imageElement.width = canvas.width;
      imageElement.height = canvas.height;

      imageElement.src = canvas.toDataURL("image/png");
    };
  };

  template.src = "https://raw.githubusercontent.com/tmporter/dog-wif-hat-generator/master/images/template.png";
  multiply.src = "https://raw.githubusercontent.com/tmporter/dog-wif-hat-generator/master/images/multiply.jpg";
}

function save() {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "dog_wif_hat.png";
  a.click();
}

colorInput.addEventListener("change", () => draw());
saveButton.addEventListener("click", () => save());

draw();
