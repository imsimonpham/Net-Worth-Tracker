import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/esm/Button'

export default function DividendDeleteButton({dividend, deleteDividend}){
  return (
    <Button className='btn btn-danger'  onClick={()=> deleteDividend(dividend.id)}>
      <FontAwesomeIcon icon={faTrash} style={{color: "#F26B53"}}/>
    </Button>
  )
}