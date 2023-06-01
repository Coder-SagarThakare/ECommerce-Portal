
// export default function getToken(){
//     return localStorage.getItem("activeToken")
// }

// export function setToken(setDataToToken) {
//     return (
//             localStorage.setItem("activeToken",setDataToToken)
//     )
// }
    
export default function getToken(tokenKey){             // change getToken parameteres
    return localStorage.getItem(tokenKey)
}

export function setToken(tokenKey,setDataToToken) {
    return (
            localStorage.setItem(tokenKey,setDataToToken)
    )
}

export function getClear(){
    localStorage.clear()
}

export function deleteToken(key){
    localStorage.removeItem(key)
}