import { isWebp } from './modules/isWebp.js';
import { sliders } from './modules/slider.js';
import { catalog } from './modules/catalog.js';
import { forms } from './modules/forms.js';
import { maps } from './modules/map.js';
import { selects } from './components/select.js';
import { spollers } from './components/spollers.js';
import { tooltips } from './components/tooltip.js';
import { popupsInit } from './components/popup.js';
import { header } from './modules/header.js';
import { scroll } from './components/scroll.js';
import { polyfills } from './components/polyfills.js';

document.addEventListener('DOMContentLoaded', function () {

  let unlock = true;
  let lockDelay = 300; // ms

  polyfills();
  isWebp();
  scroll(unlock, lockDelay);
  header(unlock, lockDelay);
  sliders();
  tooltips();
  popupsInit(unlock, lockDelay);
  selects();
  spollers();
  catalog();
  forms(lockDelay);
  maps();

})