import {HttpClient} from '@angular/common/http';
import {Injectable, Input} from '@angular/core';
import {Vehicle} from '../models/vehicle.model';
import {Register} from '../models/register.model';
import {Person} from '../models/person.model';

@Injectable()
export class ApplicationService {

  marks = Array<String>();
  models = Array<String>();
  engineCapacities = Array<String>();
  types = Array<String>();
  names = Array<String>();
  productionYears = Array<String>();
  @Input() vehicle: Vehicle = new Vehicle();
  @Input() person: Person = new Person();

  register: Register = new Register();

  constructor(private http: HttpClient) {
    this.getVehicles('productionYear');
    this.productionYears.sort();
  }

  onButtonGroupClick($event) {
    const clickedElement = $event.target || $event.srcElement;

    if (clickedElement.nodeName === 'BUTTON') {

      const isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
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

  getVehicle() {
    this.http.post<Vehicle>('http://localhost:8080/api/vehicle', this.vehicle).toPromise().then(resp => {
      this.vehicle = resp[0];
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

  setInsuranceHistoryValue(attribute: string, value: number) {
    console.log(value);
    if (attribute === 'history5YearsCountOc') {
      this.person.insuranceHistory.history5YearsCountOc = value;
    }
    if (attribute === 'history5YearsCountAc') {
      this.person.insuranceHistory.history5YearsCountAc = value;
    }
    if (attribute === 'last2YearsDamagesCountAc') {
      this.person.insuranceHistory.last2YearsDamagesCountAc = value;
    }
    if (attribute === 'last5YearsDamagesCountAc') {
      this.person.insuranceHistory.last5YearsDamagesCountAc = value;
    }
    if (attribute === 'last2YearsDamagesCountOc') {
      this.person.insuranceHistory.last2YearsDamagesCountOc = value;
    }
    if (attribute === 'last5YearsDamagesCountOc') {
      this.person.insuranceHistory.last5YearsDamagesCountOc = value;
    }
  }

  calculatePriceCall() {
    this.http.post('http://localhost:8080/api/application', this.register).toPromise().then(resp => {
      console.log(resp);
    });
  }


}
