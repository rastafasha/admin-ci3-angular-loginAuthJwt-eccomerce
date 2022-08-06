import { NgModule } from '@angular/core';
import { ImagenPipePipe } from './imagen-pipe.pipe';
import {DateAgoPipe} from './date-ago.pipe';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { KeysPipe } from './keys.pipe';


@NgModule({
  declarations: [
    ImagenPipePipe,
    DateAgoPipe,
    KeysPipe,
    EscapeHtmlPipe
  ],
  exports:[
    ImagenPipePipe,
    DateAgoPipe,
    KeysPipe,
    EscapeHtmlPipe

  ]
})
export class PipesModule { }
