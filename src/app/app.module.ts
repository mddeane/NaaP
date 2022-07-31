import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RundownComponent } from './rundown/rundown.component';
import { RundownRowComponent } from './rundown-row/rundown-row.component';
import { StoryComponent } from './story/story.component';
import { GraphicComponent } from './graphic/graphic.component';
import { ProductionComponent } from './production/production.component';
import { CommandComponent } from './command/command.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClockComponent } from './clock/clock.component';
import { DateComponent } from './date/date.component';
import { OnEnterKeyDirective } from './directives/onEnterKey/on-enter-key.directive';
import { PageNumberCellComponent } from './table/page-number-cell/page-number-cell.component';
import { StoryTitleCellComponent } from './table/story-title-cell/story-title-cell.component';
import { CheckCellComponent } from './table/check-cell/check-cell.component';
import { SegmentCellComponent } from './table/segment-cell/segment-cell.component';
import { EstTimeCellComponent } from './table/est-time-cell/est-time-cell.component';
import { OnEscKeyDirective } from './directives/on-esc-key.directive';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    RundownComponent,
    RundownRowComponent,
    StoryComponent,
    GraphicComponent,
    ProductionComponent,
    CommandComponent,
    NavbarComponent,
    ClockComponent,
    DateComponent,
    OnEnterKeyDirective,
    PageNumberCellComponent,
    StoryTitleCellComponent,
    CheckCellComponent,
    SegmentCellComponent,
    EstTimeCellComponent,
    OnEscKeyDirective,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
