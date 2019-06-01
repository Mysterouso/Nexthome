

const regex = /_[\S]+(?=\/)/g // Image size can be configured by url - Resizing the image

export const changeImageSize = (arr,string,search=regex) => {
    return arr.replace(regex,string)
}

export const dateInMonthYear = (unixDate) => new Date(unixDate*1000).toLocaleDateString([],{year:'numeric',month:'long'})

export const fetchServer = (path,body,method) => {

    const fetchOptions = {
                            method,
                            credentials:'include',
                            headers: { "Content-Type": "application/json" }                    
                            }
    
    if(body) fetchOptions.body = body;

    if(method==="DELETE"){
        return fetch(`http://localhost:5000${path}`,fetchOptions)
    } 
    else{

        return fetch(`http://localhost:5000${path}`,fetchOptions)
                   .then(resp=>resp.json())
    }


}

export const defaultUser = {
    id: 3,
    email: '',
    name: ''
  }