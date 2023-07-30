import Table from './componets/Table/Index'
import CsvFileUploader from './componets/csvFileUploader/Index'
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';


function App() {

  const csvData = useSelector((state: RootState) => state.csv.data);

  return (
    <>
    {
      csvData.length  === 0 ?  <CsvFileUploader />: <Table />
    }
    </>
  )
}

export default App
