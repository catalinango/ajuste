import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathDirective } from './math.directive';
import { MathImplService } from './math-impl.service';

@NgModule({
  declarations: [MathDirective],
  imports: [CommonModule],
  exports: [MathDirective]
})
export class MathModule {
  constructor(mathService: MathImplService) {
    // see https://docs.mathjax.org/en/latest/advanced/dynamic.html
    const script = document.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;

    document.getElementsByTagName('head')[0].appendChild(script);

    const config = document.createElement('script') as HTMLScriptElement;
    config.type = 'text/x-mathjax-config';
    // register notifier to StartupHook and trigger .next() for all subscribers
    config.text = `
    MathJax.Hub.Config({
        skipStartupTypeset: true,
        tex2jax: { inlineMath: [["$", "$"]],displayMath:[["$$", "$$"]] }
      });
      MathJax.Hub.Register.StartupHook('End', () => {
        window.hubReady.next();
        window.hubReady.complete();
      });
    `;

    document.getElementsByTagName('head')[0].appendChild(config);
  }

  // this is needed so service constructor which will bind
  // notifier to window object before module constructor is called
  public static forRoot(): ModuleWithProviders<MathModule> {
    return {
      ngModule: MathModule,
      providers: [{provide: MathImplService, useClass: MathImplService}]
    };
  }

 }
