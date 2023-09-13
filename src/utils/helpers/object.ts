export function copyAndDelete(
  obj: any, 
  fieldsToDelete: string []
) {
    if (!obj) {
      return {}
    }

    let copy = { ...obj }

    console.log({obj, fieldsToDelete})
    fieldsToDelete.forEach(field => {
      console.log({field})
      console.log(obj[field])
      if (obj[field]) {
        delete obj[field];
      }
    })

    return copy
}
