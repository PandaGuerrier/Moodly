import { useState } from 'react'

type FormData = {
  key: string
  value: any
  required?: boolean
}

export const useForm = () => {
  const [form, setForm] = useState([] as FormData[])
  const [errors, setErrors] = useState({} as any)

  const setData = (key: string, value: any) => {
    const index = form.findIndex((item: any) => item.key === key)
    if (index !== -1) {
      form[index].value = value
    } else {
      form.push({ key, value, required: false })
    }
    setForm([...form])
  }

  const getData = (key: string) => {
    const item = form.find((item: any) => item.key === key)
    if (item) {
      return item.value
    }
    return null
  }

  const transformToFormData = () => {
    const formData = new FormData()
    form.forEach((item: any) => {
      if (item.value instanceof Array) {
        item.value.forEach((value: any) => {
          formData.append(item.key, value)
        })
      } else {
        formData.append(item.key, item.value)
      }
    })
    return formData
  }

  const validate = () => {
    for (const key in form) {
      const item = form[key]
      if (item.required && !item.value) {
        errors[item.key] = `${item.key} is required`
      }
    }
    setForm([...form])
    return Object.keys(errors).length === 0
  }

  const reset = () => {
    setForm([])
  }

  return { form, setData, getData, validate, reset, errors, setErrors, transformToFormData }
}