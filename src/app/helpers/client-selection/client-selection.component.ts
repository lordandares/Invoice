import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Header } from 'src/app/models/classes/header';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/classes/client';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-selection',
  templateUrl: './client-selection.component.html',
  styleUrls: ['./client-selection.component.css']
})
export class ClientSelectionComponent implements OnInit {
  nitControl = new FormControl();
  options: Client[];
  filteredOptionsNit: Observable<Client[]>;
  name: string;
  fecha: Date;
  Client = new Client();

  @Output() clientOutPut = new EventEmitter<Client>();

  constructor(public clientsService: ClientsService) { }

  ngOnInit() {
    this.loadClients();
    this.fecha = new Date();
  }

  displayFn(client?: Client): string | undefined {
    return client ? client.nit : undefined;
  }

  private _filterNit(Nit: string): Client[] {
    const filterValue = Nit.toLowerCase();
    return this.options.filter(
      option => option.nit.toLowerCase().indexOf(filterValue) === 0
    );
  }


  // Get employees list
  loadClients() {
    return this.clientsService
      .getClients()
      .subscribe((clientsData: Client[]) => {
        this.options = clientsData;
        this.filteredOptionsNit = this.nitControl.valueChanges.pipe(
          startWith<string | Client>(''),
          map(value => (typeof value === 'string' ? value : value.nit)),
          map(Nit => (Nit ? this._filterNit(Nit) : this.options.slice()))
        );
      });
  }

  nitSelected(objclient: Client) {
    this.Client = objclient;
    this.name = this.Client.name;
    this.exposeClient();
  }

  exposeClient() {
    this.clientOutPut.emit(this.Client);
  }

  onNameChange() {
    console.log(this.Client.name);
    if (this.Client.name === undefined){
      this.Client.name = this.name;
      this.Client.nit = this.nitControl.value;
      this.clientOutPut.emit(this.Client);
    }
  }

}
