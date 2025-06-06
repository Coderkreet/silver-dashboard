import React, { useEffect } from 'react'
import { getIncomeHistoryAdmin } from '../../api/admin-api'

const IncomeHistory = () => {
    useEffect(()=>{
        getIncomeHistoryAdmin();
    },[])
  return (
    <div>
      incomeHistory is here 
    </div>
  )
}

export default IncomeHistory
