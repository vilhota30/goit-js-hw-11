import { refs } from "./refsPageElem";

export function spinnerStart() {
    refs.body.classList.add('loading');
  }

export function spinnerStop() {
    window.setTimeout(function () {
      refs.body.classList.remove('loading');
      refs.body.classList.add('loaded');
    }, 1500);
}
