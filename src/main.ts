import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environments';
import { AppModule } from './app/app.module';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }];

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  platformBrowserDynamic(providers)
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
