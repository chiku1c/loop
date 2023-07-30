export interface CsvDataRow {
    id: number;
    number: string;
    mod350: string;
    mod8000: string;
    mod20002: string;
    // mod6: string;
    [key: string]: string | number | null;
  }
  
  export interface DataItem {
    id: number;
    number: string;
    mod350: string;
    mod8000: string;
    mod20002: string;
    // mod6: string;
    [key: string]: any;
  }


  export interface TableProps {

  }