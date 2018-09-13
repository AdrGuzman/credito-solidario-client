import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';

// Application modules
import { HomeModule } from './pages/home/home.module';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { RolesModule } from './pages/roles/roles.module';
import { AuthModule } from './pages/auth/auth.module';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

// Angular Material modules
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MATERIAL_SANITY_CHECKS } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorHandler } from './shared/_services/http-handle-error.service';
import { AppHttpInterceptorService } from './shared/_services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    UsuariosModule,
    RolesModule,
    AuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [HttpErrorHandler, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
