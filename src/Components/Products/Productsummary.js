import React from 'react';

const Productsummary = ({ summary }) => {

    const [isExpanded,expandText] = React.useState(false)

    summary = typeof summary === 'string' ? summary : null

    const shortenSummary = (summary,length) =>{
        if(summary){
                let test = summary.slice(length,length+30)
                let regex =  /[\s\S]\b/g
                let findIt = test.search(regex) + length + 1
                if(summary.length>240){
                return (<span>
                        <span>{isExpanded ? summary : summary.slice(0,findIt)}</span>
                        <span className="text-expand" onClick={handleText}>{isExpanded ? ' Show less' : ' ... Show more'}</span>
                        </span>)
                }
                else{
                    return <span>{summary}</span>
                }
        }
        else{
            return <span>No summary available</span>
        }
    }
    
    const handleText = (e) => {
        e.target.classList.toggle('text-expand-active');
        expandText((prevState)=>!prevState)
    }

    const shortenedSummary= shortenSummary(summary,240)


    return(
        <p>
            {shortenedSummary}
            {/* Previous iteration below in case of bugs  */}
            {/* {isExpanded ? summary : shortenedSummary} */}
           
            {/* <span className="text-expand" onClick={handleText}>{isExpanded ? ' Show less' : ' ... Show more'}</span> */}
            
        </p>
    )
}


export default Productsummary;