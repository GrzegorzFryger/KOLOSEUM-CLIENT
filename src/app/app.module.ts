import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApplicationService} from './application/application.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import {UserRegisterService} from './user-register/user-register.service';
import {AuthInterceptor} from './auth.interceptor';
import {AuthGuard} from './auth.guard';
import { TodosComponent } from './todos/todos.component';
import {TodoService} from './todos/todo.service';
import { SecondStepComponent } from './application/secondStep/secondStep.component';

import { ThirdStepComponent } from './application/thirdStep/thirdSep.component';
import { LastStepComponent } from './application/lastStep/lastStep.component';
import {HomeService} from './home/home.service';
import { UsersComponent } from './users/users.component';
import { TodosDetailsComponent } from './todos/todos-details/todos-details.component';

import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';

import { myRxStompConfig } from './my-rx-stomp.config';
import { MessagesComponent } from './messages/messages.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { SettingsComponent } from './user-panel/settings/settings.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {LeaderboardService} from './leaderboard/leaderboard.service';
import {CookieService} from 'ngx-cookie-service';
import {SystemInfoComponent} from './system-info/system-info.component';






const appRoutes: Routes = [
  {path: 'application', component: ApplicationComponent, canActivate: [AuthGuard]},
  {path: 'system-info', component: SystemInfoComponent, canActivate: [AuthGuard]},
  {path: 'application/second', component: SecondStepComponent, canActivate: [AuthGuard]},
  {path: 'application/third', component: ThirdStepComponent, canActivate: [AuthGuard]},
  {path: 'application/last', component: LastStepComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserRegisterComponent},
  {path: 'score', component: MessagesComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]},
  {path: 'userpanel', component: UserPanelComponent, children: [
      {path: 'settings', component: SettingsComponent}
    ], canActivate: [AuthGuard]},

  {path: 'todos', component: TodosComponent, children: [
      {path: ':id', component: TodosDetailsComponent }
    ], canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ApplicationComponent,
    SystemInfoComponent,
    UserRegisterComponent,
    LeaderboardComponent,
    TodosComponent,
    SecondStepComponent,
    ThirdStepComponent,
    LastStepComponent,
    UsersComponent,
    TodosDetailsComponent,
    MessagesComponent,
    UserPanelComponent,
    SettingsComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
  ],
  providers: [
    ApplicationService,
    UserRegisterService,
    LeaderboardService,
    CookieService,
    HomeService,
    TodoService,
    AuthGuard,
    TodosComponent,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    HeaderComponent, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
