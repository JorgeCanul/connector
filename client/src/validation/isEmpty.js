const isEmpty = data => 
  data === undefined || data === null
  || (typeof data === 'object' && Object.keys(data).length === 0) || 
  (typeof data === 'string' && value.trim().length === 0)


export default isEmpty;