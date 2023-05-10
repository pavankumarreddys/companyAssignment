import './index.css'

const ContactItems = props => {
  const {contact, onDeleteTrigger, onEditTrigger} = props
  const {firstName, lastName, statusBtn, id} = contact

  const editBtnClicked = () => onEditTrigger(id)

  const deleteBtnClicked = () => onDeleteTrigger(id)

  return (
    <li className="contact-items-containers">
      <p className="items-content">
        FirstName: <span className="span-content">{firstName}</span>{' '}
      </p>
      <p className="items-content">
        LastName: <span className="span-content">{lastName}</span>
      </p>
      <p className="items-content">
        Status: <span className="span-content">{statusBtn}</span>
      </p>
      <button type="button" className="edit-btn" onClick={editBtnClicked}>
        Edit
      </button>
      <button type="button" className="delete-btn" onClick={deleteBtnClicked}>
        Delete
      </button>
    </li>
  )
}

export default ContactItems
