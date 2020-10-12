
import {consumptionData, chargesData} from '../data/monthlyData'
import { dailyConsumptionData, dailyChargesData } from '../data/dailyData'


export const getMonthlyStats = (noOfMonths, enType) => {
    let monthtData = enType == 'consumption' ? consumptionData : chargesData
    return monthtData.slice(0, noOfMonths)
}

export const getDailyStats = (enType, startDate=1, endDate=30) => {
    let data = enType == 'consumption' ? dailyConsumptionData : dailyChargesData
    return data
}
