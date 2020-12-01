import React, {useState, ChangeEvent, useEffect} from 'react'
import Table from './Table'
import {ProductProps, SelectOption} from '../../types'
import SpinnerNotification from './SpinnerNotification'
import {capitalize} from '../../utils'
import { colorOptions, stockValueOptions} from './selectOptions'
import { Container, Card, FilterInputsContainer,FilterSection,ButtonContainer, UpdateTime, Heading} from './WrappersAndStuff'
import {Select, TextInput, Label} from './FilterInputs'
import {ClearButton, FilterButton} from './Buttons'
import InfiniteScroller from './InfiniteScroller'
import Spinner from 'react-bootstrap/Spinner'

const ProductPage:React.FC<ProductProps> = ({content, category}) => {

  const [manufacturerOptions,setManufacturerOptions] = useState<SelectOption[]>(
    [{ label: "Loading ...", value: "" }])
  const [optionsLoading, setOptionsLoading] = useState(true)
  const [nameFilter, setNameFilter] = useState('')
  const [idFilter, setIdFilter] = useState('')
  const [manufacturerFilter, setManufacturerFilter] = useState<SelectOption[]>(manufacturerOptions)
  const [availabilityFilter, setAvailabilityFilter] = useState<SelectOption[]>(stockValueOptions)
  const [colorFilter, setColorFilter] = useState<SelectOption[]>(colorOptions)

  const manufacturers = manufacturerFilter.map(m => m.value)
  const availability = availabilityFilter.map(a => a.value)
  const colors = colorFilter.map(c => c.value)

  const [filteredProducts, setFilteredProducts] = useState(content.response?.products)

  const errorMessage = `Something went wrong, failed to update ${category}, refetching...`
  const loadingMessage = `Loading ${category}...`

  const clearAllFilters = () => {
    setIdFilter('')
    setNameFilter('')
    setManufacturerFilter(manufacturerOptions)
    setColorFilter(colorOptions)
    setAvailabilityFilter(stockValueOptions)
    setFilteredProducts(content.response?.products)
}
  useEffect(()=>{
    if (content.response) {
      setFilteredProducts(content.response.products)
      const options = content.response.manufacturers
      .map(m=> ({value: m, label: m}))
      setManufacturerFilter(options)
      setManufacturerOptions(options)
      setOptionsLoading(false)
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
    setFilteredProducts(content.response?.products
    ?.filter(r => r.id.startsWith(idFilter.toLowerCase()))
    .filter(r => r.name.startsWith(nameFilter.toUpperCase()))
    .filter(r => manufacturers.includes(r.manufacturer))
    .filter(r => (r.color.filter(c => 
      colors.includes(c)
      || (colors.includes('other')
      && !c.match(/red|orange|yellow|green|blue|purple|pink|grey|black|white|brown/)))).length !== 0)
    .filter(r => availability.includes(r.availability)))
  }
  
  const tableRows = () => 
  <InfiniteScroller data={filteredProducts}/>

  const filters = () => {
    return (
      <FilterInputsContainer>
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
        </FilterInputsContainer>)
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
                {optionsLoading?
                <tr>{[1,2,3,4,5,6,7].map((item)=>
                <td key={item}><Spinner animation="border" variant="dark" /></td>)}
                </tr>
                : tableRows()}
            </tbody>
          </Table>
          
        return (
        <>  {errorNotification()}
            {content.loading  && loadingNotification()}
            {content.response &&
            <Container>
              <UpdateTime>{capitalize(category)} updated: {content.updateTime}</UpdateTime>
              <Card>
                <FilterSection>
                <Heading>
                  {`Showing ${filteredProducts? filteredProducts.length: 0} products in category `}
                  <span>{category}</span>
                </Heading>
                <details open>
                  <summary>
                    Filtering options
                  </summary>
                  {filters()}
                  <ButtonContainer>
                    <ClearButton onClick={clearAllFilters}>Clear all filters</ClearButton>
                    <FilterButton onClick={filterResults}>Apply filters</FilterButton>
                  </ButtonContainer>
                  </details> 
                  </FilterSection>
                    {table()}
              </Card>
            </Container>
          }
        </>
        )
}

export default ProductPage