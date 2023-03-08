export const getLocaleDateTitle = (time) => {
    let date = new Date(time)
    let locale = 'tr-TR'
    let day = date.getDate()
    let month = date.toLocaleString(locale, { month: "long" });
    let year = date.getFullYear()
    return `${day} ${month} ${year}`
}

export const getCurrentMeal = () => {
    let currentDate = new Date()
    let hours = currentDate.getHours()
    if(hours >= 0 && hours < 12){
        return 'Kahvaltı'
    } else if(hours >= 12 && hours < 18){
        return 'Öğle Yemeği'
    } else {
        return 'Akşam Yemeği'
    }
}

export const initialDate = () => {
    let date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
}