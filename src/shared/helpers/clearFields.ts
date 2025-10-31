export function clearFields<T extends Record<string, string>>(obj: T) {
  Object.keys(obj).forEach((key) => {
    obj[key as keyof T] = '' as T[keyof T];
  })
}
