import React, {useState, ChangeEvent, useEffect} from 'react'
import Table from './Table'
import {ProductProps, SelectOption} from '../../types'
import ProductRow from './ProductRow'
import SpinnerNotification from './SpinnerNotification'
import {capitalize} from '../../utils'
import { colorOptions, stockValueOptions} from './selectOptions'
import { Container, Card, FilterContainer, UpdateTime} from './WrappersAndStuff'
import {Select, TextInput, Label} from './Inputs'
import {ClearButton} from './Buttons'

const ProductPage:React.FC<ProductProps> = ({content, category}) => {

  const [manufacturerOptions,setManufacturerOptions] = useState<SelectOption[]>(
    [{ label: "Loading ...", value: "" }])

  const [nameFilter, setNameFilter] = useState('')
  const [idFilter, setIdFilter] = useState('')
  const [manufacturerFilter, setManufacturerFilter] = useState<SelectOption[]>(manufacturerOptions)
  const [availabilityFilter, setAvailabilityFilter] = useState<SelectOption[]>(stockValueOptions)
  const [colorFilter, setColorFilter] = useState<SelectOption[]>(colorOptions)

  const manufacturers = manufacturerFilter.map(m => m.value)
  const availability = availabilityFilter.map(a => a.value)
  const colors = colorFilter.map(c => c.value)

  const errorMessage = `Something went wrong, failed to update ${category}, refetching...`
  const loadingMessage = `Loading ${category}...`

  useEffect(()=>{
    if (content.response) {
      const options = content.response.manufacturers
      .map(m=> ({value: m, label: m}))
      setManufacturerFilter(options)
      setManufacturerOptions(options)
    }
  },[content.response])

  const errorNotification = () => {
    if (content.error) return (
      <SpinnerNotification variant='warning' message={errorMessage}/>
    )
  }
  const loadingNotification = () => {
    return <SpinnerNotification variant='info' message={loadingMessage}/>
  }

  const handleIdChange = (e:ChangeEvent<HTMLInputElement>) => {
    setIdFilter(e.target.value)
  }
  const handleNameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value)
  }

  const filterResults = () => {
    return content.response?.products
    ?.filter(r => r.id.startsWith(idFilter.toLowerCase()))
    .filter(r => r.name.startsWith(nameFilter.toUpperCase()))
    .filter(r => manufacturers.includes(r.manufacturer))
    .filter(r => (r.color.filter(c => 
      colors.includes(c)
      || (colors.includes('other')
      && !c.match(/red|orange|yellow|green|blue|purple|pink|grey|black|white|brown/)))).length !== 0)
    .filter(r => availability.includes(r.availability))
  }

  const clearAllFilters = () => {
    setIdFilter('')
    setNameFilter('')
    setManufacturerFilter(manufacturerOptions)
    setColorFilter(colorOptions)
    setAvailabilityFilter(stockValueOptions)
  }
  
  const filteredProducts = filterResults()

  const tableRows = () => filteredProducts?.map(product => 
  <ProductRow key={product.id} product={product}/>)

  const filters = () => {
    return (
      <FilterContainer>
        <div>
          <Label id='nFilter'>Find by Name</Label>
          <TextInput 
          placeholder='type name' 
          value={nameFilter} 
          onChange={handleNameChange}
          aria-labelledby='nFilter'/>
        </div>
        <div>
          <Label id='iFilter'>Find by ID</Label>
          <TextInput 
          placeholder='type id' 
          value={idFilter} 
          onChange={handleIdChange}
          aria-labelledby='iFilter'/>
        </div>
        <div>
          <Label id='mFilter'>Filter by manufacturer</Label>
          <Select 
          options={manufacturerOptions} 
          value={manufacturerFilter} 
          onChange={setManufacturerFilter} 
          labelledBy={"mFilter"}
          disabled={content.loading}
        />
        </div>
        <div>
          <Label id='cFilter'>Filter by color</Label> 
          <Select 
          options={colorOptions} 
          value={colorFilter} 
          onChange={setColorFilter} 
          labelledBy={"cFilter"}
          disabled={content.loading}
        />
        </div>
        <div>
          <Label id='aFilter'>Filter by availability</Label>
          <Select 
          options={stockValueOptions} 
          value={availabilityFilter} 
          onChange={setAvailabilityFilter} 
          labelledBy={"aFilter"}
          disabled={content.loading}
        />
        </div>
        </FilterContainer>)
  }
  
  const table = () => 
        <Table >
            <thead>   
              <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Product ID</th>
              <th>Manufacturer</th>
              <th>Color</th>
              <th>Price</th>
              <th>Availability</th>
              </tr>
              </thead>
              <tbody>
                {tableRows()}
            </tbody>
          </Table>
          
        return (
        <>  {errorNotification()}
            {content.loading && loadingNotification()}
            {content.response &&
            <Container>
              <UpdateTime>{capitalize(category)} updated: {content.updateTime}</UpdateTime>
              <Card>
                  <ClearButton onClick={clearAllFilters}>Clear all filters</ClearButton>
                  {filters()}
                  <Table>
                    {table()}
                </Table>
              </Card>
            </Container>
          }
        </>
        )
}

export default ProductPage