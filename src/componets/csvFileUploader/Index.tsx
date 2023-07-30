import React from 'react'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Papa from 'papaparse';
import { uploadCsvData } from '../../redux/csvAction';
import { useDispatch } from 'react-redux';
import { CsvDataRow } from '../../redux/type';



const CsvFileUploader = () => {
    const dispatch=useDispatch()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const { data } = Papa.parse(content, {
            header: true, // Assuming the first row contains headers
          });
          const csvData: CsvDataRow[] = data as CsvDataRow[];

          dispatch(uploadCsvData(csvData));
        };
  
        reader.readAsText(file);
      }
    };




    return (
        <>
        <Container  style={{display:"flex" ,justifyContent:"center" }}>
        <Typography variant="h6" gutterBottom>
       For Perform any action Upload Csv file
      </Typography>
        </Container>
        <Container style={{display:"flex" ,justifyContent:"center" ,height:"100vh"}}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                    <CloudUploadIcon />
                    <input hidden accept="csv" multiple type="file" onChange={handleFileChange}/>
                </Button>
            </Stack>

        </Container>
        </>
    )
}

export default CsvFileUploader