import { DashboardMap } from 'components/Map'
import React from 'react'
import { Spinner } from 'reactstrap';
import { useGetEquipment } from 'utils/equipment';

const DetailedMap = () => {
  const { isLoading, data: EquipmentData } = useGetEquipment(5000);
  return (
    <div style={{height:'100vh', width:'100vw', overflow:"hidden"}}>
        {isLoading? <Spinner /> : <DashboardMap h={'100vh'} data={EquipmentData} />}
    </div>
  )
}

export default DetailedMap