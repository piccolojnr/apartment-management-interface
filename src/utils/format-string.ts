export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getMunicipalityLabel(muni: string) {
    return capitalizeFirstLetter(muni.split("-").join(" "))
}