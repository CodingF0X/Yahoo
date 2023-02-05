import { Stack, Autocomplete, TextField} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchByTxt from './SearchByTxt';

const SearchBar = () => {
  const searchResult = useSelector(state=>state.searchResult)
  const [text,setText] = useState('') // set The SearchTerm
  const [open, setOpen] = React.useState(false);

  const handleChange = (e,value)=>{
    setText(value)
    if (value.length === 0) {
      if (open) setOpen(false);
    } else {
      if (!open) 
        setOpen(true);
    }
  }

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
    <Autocomplete 
      id="free-solo-demo"
      freeSolo
      options={[searchResult]}
      getOptionLabel={(option)=>(option.name?option.name:text)} //set searchTerm within the autoComplete's option.key
      groupBy={()=>(searchResult)} // grouping the output by the array we getting from API
      onReset={()=>console.log('first')}
      onInputChange={handleChange}
      onClose={() => setOpen(false)}
      open={open}
      filterSelectedOptions
      renderGroup={(item)=>{
        const { group, children,key } = item
        //console.log(group)
        return(
           <SearchByTxt  key={key} searchResult={group} text={text} setOpen={setOpen} /> 
        )
      }}

      renderInput={(params) => (
        <TextField 
        sx={{
          "& fieldset": { border: 'none' },
        }}
        { ...params} placeholder="Search..." 
        />
      )}
    />
    </Stack>
  )
}

export default SearchBar