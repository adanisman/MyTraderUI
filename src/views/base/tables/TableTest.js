import { forwardRef, useState, useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCallout,
  CFormCheck,
  CListGroupItem,
  CContainer,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifTr, cifUs } from '@coreui/icons'
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
import { async } from '@firebase/util'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

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

const TableTest = () => {
  const [columns, setColumns] = useState([
    { title: 'Date', field: 'date' },
    { title: 'Company Name', field: 'company' },
    { title: 'Period', field: 'period' },
    { title: 'Signal', field: 'signal' },
    {
      title: 'Graphics',
      render: (signalList) => (
        <a
          href={`https://www.tradingview.com/chart/?symbol=BIST:${signalList.link}`}
          target="_blank"
        >
          {signalList.link}
        </a>
      ),
    },
  ])

  const [country, setCountry] = useState(1)
  const [signalList, setSignalList] = useState([])
  //const [selectedIndicators, setSelectedIndicators] = useState([])

  const handleChange = (e) => {
    setCountry(e.target.value)
  }

  const fetchData = async (indicators) => {
    const response = await axios.get('/api/getSignals/' + indicators)
    setSignalList(response.data)
  }
  const submit = (e) => {
    console.log('country:', country)

    var rsiBuy = rsi.checked
    var macdBuy = macd.checked
    var ma50Buy = ma50.checked
    var ma20Buy = ma20.checked
    var momBuy = mom.checked
    var ottBuy = ott.checked

    var indicators = ''
    if (rsiBuy) indicators = 'RSIBUY,' + indicators
    if (macdBuy) indicators = 'MACDBUY,' + indicators
    if (ma50Buy) indicators = 'MA50BUY,' + indicators
    if (ma20Buy) indicators = 'MA20BUY,' + indicators
    if (momBuy) indicators = 'MOMBUY,' + indicators
    if (ottBuy) indicators = 'OTTBUY,' + indicators
    //setSelectedIndicators(indicators)
    console.log(indicators)

    fetchData(indicators)

    /*
    company: "Albaraka TÃ¼rk Katilim Bankasi A.S."
    date: "2022-04-03T08:17:22.524+00:00"
    id: 2
    link: "https://www.tradingview.com/chart/?symbol=BIST:ALBRK"
    period: "DAILY"
    signal: "RSIBUY"
    source: "bist"
    stock: "ALBRK.IS"
    type: "BUY"
*/
    signalList.map((item) => {
      const newTicker = {
        company: item.company,
        date: item.date,
        id: item.id,
        link: item.link,
        period: item.period,
        signal: item.signal,
      }
      //console.log(newTicker)
      try {
        //TickerDataService.addTickers(newTicker)
        //console.log({ error: false, msg: 'New Ticker added successfully!' })
      } catch (err) {
        console.log({ error: true, msg: err.message })
      }
    })
  }
  return (
    <div>
      <form id="csv-form">
        <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
          <div class="col-md-2">
            <CIcon icon={cifUs} />
          </div>
          <div class="col-md-5">
            <CFormCheck
              type="radio"
              name="country"
              id="countryus"
              label="Us"
              value={1}
              defaultChecked
              onChange={handleChange}
            />
          </div>
          <div class="col-md-2">
            <CIcon icon={cifTr} />
          </div>

          <div class="col-md-2">
            <CFormCheck
              type="radio"
              name="country"
              id="countrytr"
              label="Tr"
              value={2}
              onChange={handleChange}
            />
          </div>
        </div>

        <CCallout color="callout callout-success">
          <div>
            <CFormCheck inline id="rsi" value="option1" label="RSI" />
            <CFormCheck inline id="macd" value="option2" label="MACD" />
            <CFormCheck inline id="ma50" value="option2" label="MA(50)" />
            <CFormCheck inline id="ma20" value="option2" label="MA(20)" />
            <CFormCheck inline id="mom" value="option2" label="MOM" />
            <CFormCheck inline id="ott" value="option2" label="OTT" />
            <span style={{ margin: 30, padding: 300 }}></span>
            <button
              class="btn btn-primary btn-space"
              onClick={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              Search
            </button>
          </div>
        </CCallout>

        {signalList.length > 0 ? (
          <>
            <div style={{ maxWidth: '100%' }}>
              <MaterialTable
                icons={tableIcons}
                title="Stock List Preview"
                columns={columns}
                data={signalList}
                options={{
                  pageSize: 10,
                  headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF',
                  },
                }}
                /*                 actions={[
                  (icon: 'save'),
                  (signalList) => ({
                    icon: () => (
                      <a href={`https://www.tradingview.com/chart/?symbol=BIST:${signalList.link}`}>
                        Open
                      </a>
                    ),
                  }),
                ]} */
              />
            </div>
          </>
        ) : null}
      </form>
    </div>
  )
}

export default TableTest
