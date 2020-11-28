import {InstockValue, SelectOption } from '../../types'

export const stockValueOptions: SelectOption[] = [
    {value: InstockValue.INSTOCK, label: 'IN STOCK'},
    {value: InstockValue.LESSTHAN10, label: 'LESS THAN 10'},
    {value: InstockValue.OUTOFSTOCK, label: 'OUT OF STOCK'}
  ]
  
  export const colorOptions: SelectOption[] = [
    {value:'red',label:'red'},
    {value:'orange',label: 'orange'},
    {value: 'yellow', label: 'yellow'},
    {value: 'green', label: 'green'},
    {value: 'blue', label: 'blue'},
    {value:'purple',label:'purple'},
    {value:'pink',label: 'pink'},
    {value: 'black', label: 'black'},
    {value: 'grey', label: 'grey'},
    {value: 'white', label: 'white'},
    {value:'other',label:'other'}
  ]