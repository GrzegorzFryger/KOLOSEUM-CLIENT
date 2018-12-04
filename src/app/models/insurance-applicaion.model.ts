import {Person} from './person.model';
import {Vehicle} from './vehicle.model';
import {Risk} from './risk.model';

export class InsuranceApplicaion {
  id: number;
  number: number;
  persons: Array<Person>;
  registerDate: Date;
  riskVariants: Array<Risk>;
  risks: Array<Risk>;
  state: string;
  vehicle: Vehicle;
  installmentAmount: number;


}
