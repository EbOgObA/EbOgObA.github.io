import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpService } from './services/chart.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { BtnMoreComponent } from './components/btn-more/btn-more.component';
import { BtnNotificationComponent } from './components/btn-notification/btn-notification.component';
import { UserComponent } from './components/user/user.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChartHeadComponent } from './components/chart-head/chart-head.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EfficiencyComponent } from './components/efficiency/efficiency.component';
import { OptimizationComponent } from './components/optimization/optimization.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BtnMoreComponent,
    BtnNotificationComponent,
    UserComponent,
    PieChartComponent,
    ChartHeadComponent,
    EfficiencyComponent,
    OptimizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
