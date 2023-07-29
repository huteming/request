const toString = Object.prototype.toString

function isFormData(data: any) {
  return toString.call(data) === '[object FormData]'
}

function isObject(data: any) {
  return data !== null && typeof data === 'object'
}

function isFile(data: any) {
  return toString.call(data) === '[object File]'
}

export function isFunction(data: any): data is Function {
  return typeof data === 'function'
}

function isNil(data: any): data is null | undefined {
  return data === null || data === undefined
}

export function defaultTo<Data>(defaults: Data, data: Data | null | undefined): Data {
  if (!isNil(data)) {
    return data
  }
  return defaults
}

/**
 * 数据格式转为 formData
 */
export const toFormData = (data: any) => {
  if (isFormData(data) || !isObject(data)) {
    return data
  }
  return Object.entries<any>(data).reduce((form, [key, value]) => {
    if (isObject(value) && !isFile(value)) {
      form.append(key, JSON.stringify(value))
    } else {
      form.append(key, value)
    }
    return form
  }, new window.FormData())
}
