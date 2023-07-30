import { DataItem } from "../../redux/type";


export const customFilterFunction = (rows: DataItem[], filters: Record<string, string | string[]>, globalSearch: string) => {
    return rows.filter((row) => {
      const allFiltersMatch = Object.keys(filters).every((columnName) => {
        const filterValue = filters[columnName];
        if (!filterValue || filterValue === '') return true;
        if (Array.isArray(filterValue)) {
          return filterValue.includes(row[columnName]);
        } else {
          return row[columnName]?.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
        }
      });

      const globalSearchMatch =
        globalSearch === '' ||
        Object.values(row).some((value) => value?.toString().toLowerCase().includes(globalSearch.toString().toLowerCase()));

      return allFiltersMatch && globalSearchMatch;
    });
  };

  
  export const columnNames = ['Number', 'mod3', 'mod4', 'mod5', 'mod6']; // Add other column names if needed
