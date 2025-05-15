import './App.css'
import TimeCard from './components/TimeCard'
import { createTheme,ThemeProvider } from '@mui/material'


const theme =createTheme({
    typography:{
        fontFamily:["IBM"],
    }
})

function App() {



  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <TimeCard/>
        </ThemeProvider>
      </div>
    
    </>
  )
}

export default App
