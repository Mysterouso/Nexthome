

const regex = /_[\S]+(?=\/)/g // Image size can be configured by url - Resizing the image

export const changeImageSize = (arr,string,search=regex) => {
    return arr.replace(regex,string)
}

export const dateInMonthYear = (unixDate) => new Date(unixDate*1000).toLocaleDateString([],{year:'numeric',month:'long'})

export const serverURL = process.env.NODE_ENV === "development" ? 'http://localhost:5000' : ''

// export const serverURL = process.env.NODE_ENV === "development" ? 'https://nextgame-app.herokuapp.com' : ''

export const fetchServer = (path,body,method,isJson) => {

    const fetchOptions = {
                            method,
                            credentials:'include',
                            headers: { "Content-Type": "application/json"}                   
                        }
    
    if(body) fetchOptions.body = body;

    if(method==="DELETE" || isJson === false){
        return fetch(`${serverURL}/api${path}`,fetchOptions)
    } 
    else{

        return fetch(`${serverURL}/api${path}`,fetchOptions)
                   .then(resp=>resp.json())
    }


}

export const defaultUser = {
    id: 3,
    email: '',
    name: ''
  }