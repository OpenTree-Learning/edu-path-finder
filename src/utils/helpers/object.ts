export function copyAndDelete(
  obj: any, 
  fieldsToDelete: string []
) {
    let copy = { ...obj }

    fieldsToDelete.forEach(field => {
        delete obj[field];
    })

    return copy
}
