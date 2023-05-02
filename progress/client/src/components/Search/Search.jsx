import React from 'react'
import { Input } from 'semantic-ui-react'

const Search = (props) => {
  return (
    <Input icon='search' placeholder="Nom de l'élève" onChange={(e)=>props.search(e.target.value)}/>
  )
}

export default Search