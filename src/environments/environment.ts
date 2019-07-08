// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //APIEndpointProducts: 'http://localhost:7072/api/products',
 // APIEndpointClients: 'http://localhost:7074/api/clients',
  //APIEndpointInvoices: 'http://localhost:7073/api/invoices',
  //APIEndpoint: 'http://localhost:7071/api/'
  APIEndpointProducts: 'https://erp-armoniatest.azurewebsites.net/api/products',
  APIEndpointClients: 'https://erp-armoniatest.azurewebsites.net/api/clients',
  APIEndpointInvoices: 'https://erp-armoniatest.azurewebsites.net/api/invoices',
  APIEndpoint: 'https://erp-armoniatest.azurewebsites.net/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
