
export function changeLoading(isLoading, place) {   
    if(isLoading) {
        place.textContent = "Сохранение...";
    } else {
        place.textContent = "Сохранить";
    }    
}
 