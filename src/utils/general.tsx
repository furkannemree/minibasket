

const isNullOrEmpty = (value:any) => (value === "" || value === null || value === undefined || value === "undefined" || (value instanceof Array && value?.length === 0))


export default {
    isNullOrEmpty,
}