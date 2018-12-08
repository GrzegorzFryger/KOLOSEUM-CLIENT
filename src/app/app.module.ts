import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
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

const appRoutes: Routes = [
  {path: 'application', component: ApplicationComponent, canActivate: [AuthGuard]},
  {path: 'application/second', component: SecondStepComponent, canActivate: [AuthGuard]},
  {path: 'application/third', component: ThirdStepComponent, canActivate: [AuthGuard]},
  {path: 'application/last', component: LastStepComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserRegisterComponent},
  {path: 'todos', component: TodosComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ApplicationComponent,
    UserRegisterComponent,
    TodosComponent,
    SecondStepComponent,
    ThirdStepComponent,
    LastStepComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    ApplicationService,
    UserRegisterService,
    HomeService,
    TodoService,
    AuthGuard,
    TodosComponent,
    HeaderComponent, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
