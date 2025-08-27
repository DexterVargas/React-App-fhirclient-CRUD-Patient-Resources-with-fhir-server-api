import './App.css'

import PatientTable from '@/components/PatientTable'
import Header from '@/shared/Header'

function App() {
  return (
    <>
    
      <Header />
     
        <main className="p-6">
          <PatientTable />
        </main>
    </> 
    
    )
}

export default App
