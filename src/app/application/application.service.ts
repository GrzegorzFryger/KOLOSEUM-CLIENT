import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Vehicle} from '../models/vehicle.model';
import {Register} from '../models/register.model';
import {Person} from '../models/person.model';
import {InsuranceApplicaion} from '../models/insurance-applicaion.model';
import {Observable} from 'rxjs/Observable';
import {UserRegisterService} from '../user-register/user-register.service';

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
  application: InsuranceApplicaion = new InsuranceApplicaion();

  register: Register = new Register();

  constructor(private http: HttpClient, private userService: UserRegisterService) {
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
      this.vehicle = new Vehicle();
      this.models = [];
      this.engineCapacities = [];
      this.types = [];
      this.vehicle.productionYear = attribute;
    }
    if (value === 'mark') {
      this.vehicle.model = null;
      this.vehicle.engineCapacity = null;
      this.vehicle.type = null;
      this.models = [];
      this.engineCapacities = [];
      this.types = [];
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
    if (attribute === 'history5YearsCountOc') {
      this.person.insuranceHistory.history5YearsCountOc = value;
      this.person.insuranceHistory.last2YearsDamagesCountOc = 0;
      this.person.insuranceHistory.last5YearsDamagesCountOc = 0;
    }
    if (attribute === 'history5YearsCountAc') {
      this.person.insuranceHistory.history5YearsCountAc = value;
      this.person.insuranceHistory.last2YearsDamagesCountAc = 0;
      this.person.insuranceHistory.last5YearsDamagesCountAc = 0;
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

  async calculatePriceCall() {
    this.register.seller = this.userService.getUserObjet();
    await this.http.post<InsuranceApplicaion>('http://localhost:8080/api/application', this.register).toPromise().then(resp => {
      this.application = resp;
      console.log(resp);
    });
  }

  getCalculationById(id: number): Observable<InsuranceApplicaion> {
    return this.http.get<InsuranceApplicaion>('http://localhost:8080/api/application/' + id);
  }


  async updateApplication(application: InsuranceApplicaion): Promise<InsuranceApplicaion> {
    return await this.http.put<InsuranceApplicaion>('http://localhost:8080/api/application/' + application.id, application).toPromise();
  }

  async acceptApplication(application: InsuranceApplicaion): Promise<InsuranceApplicaion> {
    return await this.http.post<InsuranceApplicaion>('http://localhost:8080/api/application/' + application.id + '/accept' , application).toPromise();
  }
}
