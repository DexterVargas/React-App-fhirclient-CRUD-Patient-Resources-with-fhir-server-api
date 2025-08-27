import './App.css'

import PatientTable from '@/components/PatientTable'
import Header from '@/shared/Header'
import Banner from '@/shared/Banner'
import Footer from './shared/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
    
      <Header />
      <Banner />
      <main className="flex-1 p-6">
        <PatientTable />
      </main>
      <Footer />
    </div> 
    
    )
}

export default App
