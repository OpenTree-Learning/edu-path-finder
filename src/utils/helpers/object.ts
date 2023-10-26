export function copyAndDelete(
  obj: any, 
  fieldsToDelete: string []
) {
    if (!obj) {
      return {}
    }

    let copy = { ...obj }

    fieldsToDelete.forEach(field => {
      if (obj[field]) {
        delete obj[field];
      }
    })

    return copy
}
