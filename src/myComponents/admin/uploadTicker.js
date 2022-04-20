import { forwardRef, useState, useEffect } from 'react'
import TickerDataService from '../services/TickerDataService'
import { Container, Navbar, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import './uploadTicker.css'
import axios from 'axios'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

export default function CsvReader() {
  const [csvFile, setCsvFile] = useState()
  const [csvArray, setCsvArray] = useState([])
  const [columns, setColumns] = useState([
    { title: 'Symbol', field: 'symbol' },
    { title: 'Company Name', field: 'cname' },
  ])

  const deleteRecs = async (e) => {
    //  TickerDataService.deleteAllTickers()
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    csvArray.map((item) => {
      const newTicker = { symbol: item.symbol, cname: item.cname }
      console.log(newTicker)
      try {
        TickerDataService.addTickers(newTicker)
        //console.log({ error: false, msg: 'New Ticker added successfully!' })
      } catch (err) {
        console.log({ error: true, msg: err.message })
      }
    })
  }
  const saveAll = async (e) => {
    e.preventDefault()
    const file = csvFile
    TickerDataService.sendTickerFile(file)
  }

  const processCSV = (str, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim)
    const rows = str.slice(str.indexOf('\n') + 1).split('\n')

    const newArray = rows.map((row) => {
      const values = row.split(delim)
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i]
        return obj
      }, {})
      return eachObject
    })
    // console.log(newArray)
    setCsvArray(newArray)
  }

  const submit = () => {
    const file = csvFile
    const reader = new FileReader()

    reader.onload = function (e) {
      const text = e.target.result
      //console.log(text)
      processCSV(text)
    }

    reader.readAsText(file)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand> */}
        <form id="csv-form">
          <input
            type="file"
            class="form-control"
            accept=".csv"
            id="csvFile"
            onChange={(e) => {
              setCsvFile(e.target.files[0])
            }}
          ></input>

          <button
            class="btn btn-primary btn-space"
            onClick={(e) => {
              e.preventDefault()
              if (csvFile) submit()
            }}
          >
            Read Csv
          </button>

          <button type="button" class="btn btn-success btn-space" onClick={saveAll}>
            Save to DB
          </button>
          <button type="button" class="btn btn-success btn-space" onClick={deleteRecs}>
            Delete All Recs
          </button>

          {csvArray.length > 0 ? (
            <>
              <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                  icons={tableIcons}
                  title="Stock List Preview"
                  columns={columns}
                  data={csvArray}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          setCsvArray([...csvArray, newData])

                          resolve()
                        }, 1000)
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...csvArray]
                          const index = oldData.tableData.id
                          dataUpdate[index] = newData
                          setCsvArray([...dataUpdate])

                          resolve()
                        }, 1000)
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...csvArray]
                          const index = oldData.tableData.id
                          dataDelete.splice(index, 1)
                          setCsvArray([...dataDelete])

                          resolve()
                        }, 1000)
                      }),
                  }}
                />
              </div>
            </>
          ) : null}
        </form>
      </Container>
    </Navbar>
  )
}
