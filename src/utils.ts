import Papa from 'papaparse';
import { MedicalRecord } from './types';

export const parseData = async (file: File | string): Promise<MedicalRecord[]> => {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      if (file.trim().startsWith('[')) {
        try {
          resolve(JSON.parse(file));
        } catch (e) {
          reject(e);
        }
      } else {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            resolve(results.data as MedicalRecord[]);
          },
          error: (error: any) => reject(error)
        });
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (file.name.endsWith('.json')) {
          try {
            resolve(JSON.parse(text));
          } catch (err) {
            reject(err);
          }
        } else {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              resolve(results.data as MedicalRecord[]);
            },
            error: (error: any) => reject(error)
          });
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    }
  });
};

export const filterData = (data: MedicalRecord[], filters: any) => {
  const keyMap: Record<string, string> = {
    supplierID: 'SupplierID',
    category: 'Category',
    licenseNo: 'LicenseNo',
    model: 'Model',
    customerID: 'CustomerID',
    lotNo: 'LotNO',
    sn: 'SerNo',
    timezone: 'timezone' // Not in dataset, but mapped for completeness
  };

  return data.filter(item => {
    for (const filterKey in filters) {
      const filterValue = filters[filterKey];
      if (!filterValue) continue;

      const dataKey = keyMap[filterKey] || filterKey;
      const itemValue = item[dataKey];

      if (itemValue === undefined || itemValue === null) {
        // If the filter has a value but the item doesn't have this field, filter it out
        return false;
      }

      if (!itemValue.toString().toLowerCase().includes(filterValue.toLowerCase())) {
        return false;
      }
    }
    return true;
  });
};
