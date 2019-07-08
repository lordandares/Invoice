import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './helpers/menu/menu.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AgGridModule } from 'ag-grid-angular';
import { ProductSelectionComponent } from './helpers/product-selection/product-selection.component';
import { ClientSelectionComponent } from './helpers/client-selection/client-selection.component';
import { ProductViwerComponent } from './helpers/product-viwer/product-viwer.component';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { ProductCrudComponent } from './cruds/product-crud/product-crud.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import { ProductGridComponent } from './helpers/product-grid/product-grid.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InvoiceViewerComponent } from './helpers/invoice-viewer/invoice-viewer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProductService } from './services/product.service';
import { ClientsService } from './services/clients.service';
import { InvoiceService } from './services/invoice.service';
import {MatListModule} from '@angular/material/list';
import { PayInvoiceComponent } from './helpers/pay-invoice/pay-invoice.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { GoogleChartsModule } from 'angular-google-charts';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

// Note - locally we're using http for Azure Functions.  This is needed for the interceptor to attach tokens when making calls to the Function API.
export const protectedResourceMap: Map<string, Array<string>> = new Map<string, Array<string>>();
protectedResourceMap.set("http://localhost:7071/api/", ["https://letsbuildit.onmicrosoft.com/demoapi/demo.read"]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FacturacionComponent,
    MenuComponent,
    ProductSelectionComponent,
    ClientSelectionComponent,
    ProductViwerComponent,
    ProductCrudComponent,
    ProductGridComponent,
    InvoiceViewerComponent,
    PayInvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AgGridModule.withComponents([]),
    MatCardModule,
    FlexLayoutModule,
    MatSliderModule,
    MatDividerModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatBadgeModule,
    MatSidenavModule,
    MatChipsModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    GoogleChartsModule.forRoot('AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'),
 ],
  providers: [
    ProductService,
    ClientsService,
    InvoiceService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
