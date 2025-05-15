import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000); // 30 segundos

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld) {
  // await this.cleanup(); (descomenta si lo necesitas)
});