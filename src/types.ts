export interface MedicalRecord {
  SupplierID: string;
  Deliverdate: string;
  CustomerID: string;
  LicenseNo: string;
  Category: string;
  UDID: string;
  DeviceNAME: string;
  LotNO: string;
  SerNo: string;
  Model: string;
  Number: number;
  [key: string]: any;
}

export interface FilterState {
  timezone: string;
  supplierID: string;
  category: string;
  licenseNo: string;
  model: string;
  customerID: string;
  lotNo: string;
  sn: string;
}
