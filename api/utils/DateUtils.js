export const getThisWeek = () => resetDate(new Date().last().monday())

export const getPreviousWeek = () => resetDate(new Date().last().monday().last().monday())

export const getThisMonth = () => resetDate(new Date().moveToFirstDayOfMonth())

export const getPreviousMonth = () => resetDate(new Date().previous().month().moveToFirstDayOfMonth())

export const getDayTitle = (time) => {
    let date = new Date(time).getDate()
    let today = new Date().getDate()
    var yesterday = new Date(Date.now() - 86400000).getDate()
    if(date == today){
        return 'Bugün'
    } else if(date == yesterday){
        return 'Dün'
    } else {
        return getLocaleDateTitle(time)
    }
}

const resetDate = (date) => {
    date.setUTCHours(0, 0, 0, 0)
    return date
}

const getLocaleDateTitle = (time) => {
    let date = new Date(time)
    let locale = 'tr-TR'
    let day = date.getDate()
    let month = date.toLocaleString(locale, { month: "long"});
    let year = date.getFullYear()
    let dayName = date.toLocaleString(locale, { weekday: "long" });
    return `${day} ${month} ${year} - ${dayName}`
}

export const getTimeTitle = (time) => {
    let date = new Date(time)
    let minutes = date.getMinutes()
    return`${date.getHours()}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
}