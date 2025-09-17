// Подключается к API Owlbear Rodeo
import OBR from "@owlbear-rodeo/sdk";

const SPEED = 50; // пикселей
const ROTATION = 15; // градусов

OBR.onReady(async () => {
  console.log("WASD Movement loaded");

  window.addEventListener("keydown", async (e) => {
    const selected = await OBR.player.getSelection();
    if (selected.length === 0) return;

    const items = await OBR.scene.items.getItems(selected);
    for (let item of items) {
      let { x, y } = item.position;
      let rotation = item.rotation || 0;

      switch (e.key.toLowerCase()) {
        case "w":
          y -= SPEED;
          break;
        case "s":
          y += SPEED;
          break;
        case "a":
          x -= SPEED;
          break;
        case "d":
          x += SPEED;
          break;
        case "q":
          rotation -= ROTATION;
          break;
        case "e":
          rotation += ROTATION;
          break;
        default:
          return;
      }

      OBR.scene.items.updateItems([item.id], {
        position: { x, y },
        rotation,
      });
    }
  });
});
