import React from 'react';

const Productsummary = ({ summary }) => {

    const [isExpanded,expandText] = React.useState(false)

    summary = typeof summary === 'string' ? summary : null

    const shortenSummary = (summary,length) =>{
        if(summary){
                let test = summary.slice(length,length+30)
                let regex =  /[\s\S]\b/g
                let findIt = test.search(regex) + length + 1
                return summary.slice(0,findIt)
        }
        else{
            return "No summary available"
        }
    }
    
    const handleText = (e) => {
        e.target.classList.toggle('text-expand-active');
        expandText((prevState)=>!prevState)
    }

    const shortenedSummary = shortenSummary(summary,140)


    return(
        <p>
            {isExpanded ? summary : shortenedSummary}
           
            <span className="text-expand" onClick={handleText}>{isExpanded ? ' Show less' : ' ... Show more'}</span>) : <span></span>
            
        </p>
    )
}


export default Productsummary;