import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

const PopupInfo = (props) => (
  <Popup content={props.infos} trigger={<Button>{props.capacite}</Button>} />
)   

export default PopupInfo