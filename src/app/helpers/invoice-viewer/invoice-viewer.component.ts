import { Component, OnInit, Input } from '@angular/core';
import { Detail } from 'src/app/models/classes/detail';
import { Client } from 'src/app/models/classes/client';

@Component({
  selector: 'app-invoice-viewer',
  templateUrl: './invoice-viewer.component.html',
  styleUrls: ['./invoice-viewer.component.css']
})
export class InvoiceViewerComponent implements OnInit {

  @Input() DetailGrid: Detail;
  @Input() Client: Client;
  @Input() date: Date;
 

  rowData: any;
  private gridApi;
  public rowSelection;
  private gridColumnApi;
  public columnDefs;

  constructor() {
    this.columnDefs = [
      { headerName: 'Cantidad', field: 'Cantidad', sortable: false, filter: false  },
      { headerName: 'Producto', field: 'Product.name', sortable: true, filter: true  },
    ];
    this.rowSelection = 'multiple';
   }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  updateGrid(){
   this.gridApi.setRowData(this.DetailGrid);

  }

  onSelectionChanged() {
    console.log(this.gridApi.getSelectedRows());
    return 0;
  }

}
