import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { provideFluentDesignSystem, allComponents } from '@fluentui/web-components';

provideFluentDesignSystem().register(allComponents);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
