import { FC, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DataItem, TableProps } from '../../redux/type';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, SelectChangeEvent } from '@mui/material';
import { customFilterFunction } from './helper';
import {  menuProps } from './VirtualizedMenuList';


const Table: FC<TableProps> = () => {
  const csvData = useSelector((state: RootState) => state.csv.data);
  const [columnFilters, setColumnFilters] = useState<Record<string, string | string[]>>({});
  const [globalSearch, setGlobalSearch] = useState('');

  const uniqueValuesByColumn: Record<keyof DataItem, string[]> = useMemo(() => {
    const uniqueValues: Record<keyof DataItem, Set<string>> = {
      id: new Set(),
      number: new Set(),
      mod350: new Set(),
      mod8000: new Set(),
      mod20002: new Set(),
      // mod6: new Set(),
    };

    csvData.forEach((row) => {
      Object.keys(uniqueValues).forEach((columnName) => {
        uniqueValues[columnName as keyof DataItem].add(row[columnName as keyof DataItem] as string);
      });
    });

    const uniqueValuesArray: Record<keyof DataItem, string[]> = {} as any;
    Object.keys(uniqueValues).forEach((columnName) => {
      uniqueValuesArray[columnName as keyof DataItem] = Array.from(uniqueValues[columnName]);
    });

    return uniqueValuesArray;
  }, [csvData]);

  

  const handleColumnFilterChange = (
    event: SelectChangeEvent<string | string[]>,
    _child: React.ReactNode
  ) => {
    const { name, value } = event.target;
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const getColumnFilterOptions = (columnName: keyof DataItem) => {
    console.log(columnName);
    const selectedValues = columnFilters[columnName] || [];
  
    // Add a check to ensure uniqueValuesByColumn[columnName] is defined and an array
    const values = uniqueValuesByColumn[columnName] || [];
    console.log(values)
    
    return values.map((value) => (
      <MenuItem key={value} value={value}>
        <Checkbox checked={selectedValues.includes(value)} />
        {value}
      </MenuItem>
    ));
  };
  



  const columns: TableColumn<DataItem>[] = useMemo(
    () => [
      {
        name: (
          <>
          <InputLabel>Number</InputLabel>
            <FormControl>
              <Select
              label="number"
              variant='standard'
              style={{minHeight:"100px"}}
                name="number"
                value={columnFilters['number'] || []}
                multiple
                onChange={handleColumnFilterChange}
                MenuProps={menuProps}
              >
                {getColumnFilterOptions('number')}
              </Select>
            </FormControl>
          </>
        ),
        selector: (row: DataItem) => row.number,
      },
      {
        name: (
          <>
          <InputLabel>mod350</InputLabel>
            <FormControl>
              <Select
              variant='standard'
                name="mod350"
                value={columnFilters['mod350'] || []}
                multiple
                onChange={handleColumnFilterChange}
              >
                {getColumnFilterOptions('mod350')}
              </Select>
            </FormControl>
          </>
        ),
        selector: (row: DataItem) => row.mod350,
      },
      {
        name: (
          <>
          <InputLabel>mod8000</InputLabel>
            <FormControl>
              
              <Select
              variant='standard'
                name="mod8000"
                value={columnFilters['mod8000'] || []}
                multiple
                onChange={handleColumnFilterChange}
              >
                {getColumnFilterOptions('mod8000')}
              </Select>
            </FormControl>
          </>
        ),
        selector: (row: DataItem) => row.mod8000,
       
      },
      {
        name: (
          <>
          <InputLabel>mod20002</InputLabel>
            <FormControl>
              
              <Select
              variant='standard'
                name="mod20002"
                value={columnFilters['mod20002'] || []}
                multiple
                onChange={handleColumnFilterChange}
              >
                {getColumnFilterOptions('mod20002')}
              </Select>
            </FormControl>
          </>
        ),
        selector: (row: DataItem) => row.mod20002,

      },
      // {
      //   name:  (
      //     <>
      //     <InputLabel>mod6</InputLabel>
      //       <FormControl>
              
      //         <Select
      //         variant='standard'
      //           name="mod6"
      //           value={columnFilters['mod6'] || []}
      //           multiple
      //           onChange={handleColumnFilterChange}
      //         >
      //           {getColumnFilterOptions('mod6')}
      //         </Select>
      //       </FormControl>
      //     </>
      //   ),
      //   selector: (row: DataItem) => {
      //     return (
      //       row.mod6
      //     )
      //   },

      // },
      // ...
    ],
    [columnFilters]
  );



  return (
    <div>
      <input
        type="text"
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        placeholder="Global Search..."
      />
      <DataTable
        data={customFilterFunction(csvData, columnFilters, globalSearch)}
        columns={columns}
        pagination
        paginationPerPage={100}
        paginationRowsPerPageOptions={[20]}
        fixedHeader
        fixedHeaderScrollHeight="500px"
      />
    </div>
  );
};

export default Table;
