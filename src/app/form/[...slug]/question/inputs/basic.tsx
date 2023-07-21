'use client'


import { Field } from 'formik'


export function Text (props: any) {
  return <Field type="text" id="reponse" name="response" {...props} />
}

export function Number (props: any) {
  return <Field type="number" id="reponse" name="response" {...props} />
}

export function Email (props: any) {
  return <Field type="email" id="reponse" name="response" {...props} />
}