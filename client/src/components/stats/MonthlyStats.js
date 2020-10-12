import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";


import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { getMonthlyStats, getDailyStats } from '../../services/mockAPI'

const VIEWS = {
    MONTHLY: 'monthly',
    DAILY: 'daily'
}




const RenderBarChart = ({data}) => (
    <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 40, bottom: 5,
        }}
    >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" fill="#8884d8" />
        <Bar dataKey="prev" fill="#82ca9d" />
      </BarChart>
)


const BarCharts = ({selectedSubMenu}) => {
    const [view, setView] = useState(VIEWS.MONTHLY)
    const [noOfMonths, setNoofMonth] = useState(6)
    const [ enType, setEnType] = useState('consumption')
    const [ data, setData ] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    useEffect(() => {
        if(view == VIEWS.MONTHLY){
            setData(getMonthlyStats(noOfMonths, enType))
        } else {
            setData(getDailyStats(enType))
        }
       
    }, [noOfMonths, enType, view])


   return (
    <div className="section project-details">

        <h4> {selectedSubMenu} {startDate} { endDate}</h4>

        <div className="row">
            <div className="col s2">
            <label>
                <input name="charges" type="radio" checked={enType=='charges'} onChange={() => setEnType('charges')} />
                <span>Energy Charges</span>
            </label>
            </div>
            <div className="col s2">
            <label>
                <input name="consumption" type="radio" checked={enType=='consumption'} onChange={() => setEnType('consumption')} />
                <span>Energy Consumption</span>
            </label>
            </div>
        </div>

        <div className="row">
                <div className="input-field col s3">
                    {
                        view == VIEWS.MONTHLY ?
                        <select onChange={(e) => setNoofMonth(e.target.value)}>
                            <option value={6}> Last 6 month </option>
                            <option value={3}> Last 3 months</option>
                        </select> :
                        <>
                            <input type= "date" className="datepicker" onChange={(e) => setStartDate(e.target.value)} />
                            <input type= "date" className="datepicker" onChange={(e) => setEndDate(e.target.value)} />
                            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                            <DatePicker selected={endDate} onChange={date => setEndDate(date)} /> */}
                        </>



                    }

                </div>

            <div className="input-field col s3 offset-s2">
                <button className={`waves-effect waves-light btn ${view !== VIEWS.MONTHLY ? 'white' : ''}`} onClick={() => setView(VIEWS.MONTHLY)}> Monthly </button>
                <button className={`waves-effect waves-light btn ${view !== VIEWS.DAILY ? 'white' : ''}`} onClick={() => setView(VIEWS.DAILY)}> Daily </button>

            </div>

            <div className="input-field col s2 offset-s2">
                <div class="switch">
                    <label> Temprature
                        <input type="checkbox" />
                        <span class="lever"></span>
                    </label>
                </div>
            </div>
        </div>

        <div  className="row">
            {/* <div className="col-s3 offset-s3"></div> */}
            <div className="col-s6 offset-s3">
                <RenderBarChart data={data} />
            </div>
        </div>
        
    </div>
   )
}


const mapStateToProps = (state) => ({
    selectedSubMenu : state.stats.selectedSubMenu
})

export default connect(mapStateToProps, null)(BarCharts)