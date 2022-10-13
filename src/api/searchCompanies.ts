import axios from "axios"

export function searchCompanies<T>(query:string) {
    return axios.get<T>(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`)
}