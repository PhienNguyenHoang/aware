import React from 'react'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime';
const DashboardProductCard = ({name, customerType, category, createdAt}) => {
    dayjs.extend(relativeTime)
    return (
        <div>
            {name} {customerType} {category} 
        </div>
    )
}

export default DashboardProductCard;



