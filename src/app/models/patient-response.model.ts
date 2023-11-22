import {MetaData} from "./meta-data.model";
import {PatientData} from "./patient-data.model";

export class PatientResponse {
  meta?: MetaData;
  data?: PatientData;
}
