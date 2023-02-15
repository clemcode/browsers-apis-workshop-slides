import { defineAppSetup } from '@slidev/types'
import {prev, next} from '@slidev/client/logic/nav'

const joyConControl = {
  install() {
    window.addEventListener('gamepadconnected', ({ gamepad }) => {
      const gp = navigator.getGamepads()[gamepad.index];
      gp.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 500,
        weakMagnitude: 1.0,
        strongMagnitude: 1.0
      });

      update()
    });
  }
}

let triggered = false

const update = () => {
  for (const gamepad of navigator.getGamepads()) {
    if (!gamepad) continue;
    for (const [index, button] of gamepad.buttons.entries()) {
      if (button.pressed && !triggered) {
        triggered = true
        if ([8].includes(index)) {
          prev()
        } else if ([6, 7].includes(index)) {
          next()
        }
        setTimeout(() => {
          triggered = false
        }, 100);
      }
    }
  }
  requestAnimationFrame(update);
};

export default defineAppSetup(({ app }) => {
  app.use(joyConControl)
})