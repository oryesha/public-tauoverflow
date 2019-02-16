import {ElementRef, Injectable} from '@angular/core';
import {KatexService} from 'ng-katex/src/ng-katex.service';

@Injectable({
  providedIn: 'root'
})
export class LatexRenderingService {

  constructor(private katex: KatexService) { }

  public findAllEquations(content: string, equations: string[]): string {
    let initialContent = content;
    const text: string[] = [];
    const first = content.split('&lt;/latex&gt;');
    if (first.length > 1) {
      first.forEach((s: string, index: number) => {
        if (index === first.length - 1) {
          text.push(s);
          return;
        }
        const second = s.split('&lt;latex&gt;');
        text.push(second[0] + '<span class="EquationContainer"></span>');
        equations.push(second[1]);
      });
      initialContent = text.join('');
    }
    return initialContent;
  }

  public renderEquations(contentContainer: ElementRef, equations: string[]) {
    const containers =
      contentContainer.nativeElement.getElementsByClassName('EquationContainer');
    equations.forEach((eq, index) => {
      this.katex.render(eq, new ElementRef(containers[index]));
    });
  }
}
