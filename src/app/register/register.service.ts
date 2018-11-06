import {HttpClient} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Vehicle} from './vehicle.model';

@Injectable()
export class RegisterService {

  marks = Array<String>();
  models = Array<String>();
  engineCapacities = Array<String>();
  types = Array<String>();
  names = Array<String>();
  productionYears = Array<String>();
  @Input() vehicle: Vehicle = new Vehicle();

  constructor(private http: HttpClient) {
    this.getVehicles('productionYear');
    this.productionYears.sort();
  }

  onButtonGroupClick($event) {
    const clickedElement = $event.target || $event.srcElement;

    if (clickedElement.nodeName === 'BUTTON') {

      const isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove('active');
      }

      clickedElement.className += ' active';
    }

  }

  getVehicles(attribute: string) {
    this.http.post<String[]>('http://localhost:8080/api/vehicle/' + attribute, this.vehicle).toPromise().then(resp => {
      if (attribute === 'mark') {
        this.marks = resp;
      }
      if (attribute === 'model') {
        this.models = resp;
      }
      if (attribute === 'engineCapacity') {
        this.engineCapacities = resp;
      }
      if (attribute === 'type') {
        this.types = resp;
      }
      if (attribute === 'name') {
        this.names = resp;
      }
      if (attribute === 'productionYear') {
        this.productionYears = resp;
      }
    });
  }

  setVehicleProperty(value: string, attribute: string) {
    if (value === 'productionYear') {
      this.vehicle.productionYear = attribute;
    }
    if (value === 'mark') {
      this.vehicle.mark = attribute;
    }
    if (value === 'model') {
      this.vehicle.model = attribute;
    }
    if (value === 'engineCapacity') {
      this.vehicle.engineCapacity = attribute;
    }
    if (value === 'type') {
      this.vehicle.type = attribute;
    }
    if (value === 'name') {
      this.vehicle.name = attribute;
    }
  }


}
