import {PageData} from "./page-data.model";
import {PatientData} from "./patient-data.model";

export class PatientPageData {
  page? : PageData;
  content : PatientData[] = [];
}
