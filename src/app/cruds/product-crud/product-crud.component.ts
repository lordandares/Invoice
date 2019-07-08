import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/classes/product';
import { FormBuilder, FormGroup, Validators , FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css'],
  providers: [ProductService]
})
export class ProductCrudComponent implements OnInit {
  [x: string]: any;
  products: Product[];
  rowData: Product[];
  private gridApi;
  private gridColumnApi;

  productForm: FormGroup;
  nombre: string = '';
  description: string = '';
  totalAbailable: number = 0;
  price: number = 0;
  type: string = '';

  public columnDefs = [
    { headerName: 'Codigo', field: 'cod', editable: true, sortable: true, filter: true },
    { headerName: 'Nombre', field: 'name', editable: true, sortable: true, filter: true },
    { headerName: 'Costo Unitario', field: 'price', editable: true, sortable: true, filter: true },
    { headerName: 'Cantidad', field: 'totalAvailable', editable: true, sortable: true, filter: true },
    { headerName: 'Descripcion', field: 'description', editable: true, sortable: true, filter: true },
    { headerName: 'Image', field: 'image' }
  ];

  constructor(public productService: ProductService, private fb: FormBuilder) {
        // To initialize FormGroup
        this.productForm = fb.group({
          name : [null, Validators.required],
          description : [null, Validators.required],
          totalAvailable : [null, Validators.required],
          price : [null, Validators.required],
          image : [null, Validators.required],
          type: [null, Validators.required],
        });
  }

  ngOnInit() {
    this.loadProducts();
  }

  onFormSubmit(form: NgForm) {
    const newProduct = new Product();
    newProduct.deserialize(form);
    newProduct.tenantId = '048ae5e4-004e-427a-8a5d-3a4a42c47ee7';
    newProduct.cod = 'coaca123aw23';
    console.log(newProduct);
    this.productService.setProducts(newProduct)
    .subscribe((productData: Product) => {
      if (productData) {
        this.products.push(productData);
        this.gridApi.setRowData(this.products);

      }
    });
  }

  // Get product list
  loadProducts() {
    return this.productService
      .getProducts()
      .subscribe((productData: Product[]) => {
        this.products = productData;
        if (this.products) {
          this.gridApi.setRowData(this.products);
        }
      });
  }

  onAddItem() {
    const newProduct = new Product();
    this.products.push(newProduct);
    this.gridApi.setRowData(this.products);
    this.gridApi.setFocusedCell(0, 0, 0);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  onFileChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.productForm.patchValue({
          image: reader.result
        });

        // need to run CD since file load runs outside of zone
       // this.cd.markForCheck();
      };
    }
  }
}
