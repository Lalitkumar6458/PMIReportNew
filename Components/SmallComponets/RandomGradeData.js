import React from 'react'

const RandomGradeData = ({data}) => {
 console.log("get data six",data)
    
    function getRandomValueInRange(range) {
        if (range.includes('max') || range.includes('Max')|| range.includes('MAX')) {
           const maxValue = parseFloat(range.split(range.slice(-3)));
            const minValue = parseFloat(maxValue > 0 ? maxValue - 1 : 0);
            return Math.random() * (maxValue - minValue) + minValue;
        } else if (range.includes('<')) {
            const maxValue = parseFloat(range.slice(1));
          const minValue = parseFloat(maxValue>0? maxValue-1:0);
          return Math.random() * (maxValue - minValue) + minValue;
        } else {
            const [min, max] = range.split('-');
            const minValue = parseFloat(min);
            const maxValue = parseFloat(max);
            return Math.random() * (maxValue - minValue) + minValue;
        }
    }

    function generateRandomData(inputData) {
        const result = {};

       console.log("inputData", inputData);
            inputData.map((item) => {
              const value = item.percent;
              console.log("value", value);

              if (
                value.includes("-") ||
                value.includes("max") ||
                value.includes("<") ||
                value.includes("Max") ||
                value.includes("MAX")
              ) {
                const randomValue = getRandomValueInRange(value);
                result[item.Element] = randomValue.toFixed(2);
              } else {
                result[item.Element] = value;
              }
            });

           
        
        
        return result;
    }
    
    const randomData = generateRandomData(data);
    return randomData
}

export default RandomGradeData