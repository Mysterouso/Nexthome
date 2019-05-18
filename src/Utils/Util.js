

const regex = /_[\S]+(?=\/)/g // Image size can be configured by url - Resizing the image

export const changeImageSize = (arr,string,search=regex) => {
    return arr.replace(regex,string)
}

