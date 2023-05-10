import {Component} from 'react'
import {v4} from 'uuid'

import SideBar from '../SideBar'
import ContactItems from '../ContactItems'

import './index.css'

let data = []
let gettingDataFromLocal = localStorage.getItem('Trail')
let convertedData = JSON.parse(gettingDataFromLocal)
if (convertedData !== null) {
  data = convertedData
}

class Contacts extends Component {
  state = {
    contactList: data,
    isContactBtnActive: true,
    firstName: '',
    lastName: '',
    statusBtn: 'Inactive',
    dataLength: true,
    editedContact: false,
    editedId: '',
    localstorage: false,
  }

  addingNewContact = () => {
    this.setState({isContactBtnActive: false, dataLength: false})
  }

  getFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  getLastName = event => {
    this.setState({lastName: event.target.value})
  }

  updateStatus = event => {
    this.setState({statusBtn: event.target.value})
  }

  userFormDataAdd = event => {
    event.preventDefault()
    const {
      firstName,
      lastName,
      statusBtn,
      editedContact,
      editedId,
      contactList,
    } = this.state

    if (firstName === '' || lastName === '') {
      // alert('Please Enter valid Inputs')
      console.log('k')
    } else if (editedContact === false) {
      const id = v4()
      const newData = {firstName, lastName, statusBtn, id}
      gettingDataFromLocal = localStorage.getItem('Trail')
      convertedData = JSON.parse(gettingDataFromLocal)
      if (convertedData !== null) {
        this.setState({contactList: convertedData})
      }
      this.setState(prevesValue => ({
        contactList: [...prevesValue.contactList, newData],
        firstName: '',
        lastName: '',
        statusBtn: 'Inactive',
        isContactBtnActive: true,
        localstorage: true,
      }))

      if (contactList.length < 0) {
        this.setState({dataLength: true})
      }
    } else if (editedContact === true) {
      const id = editedId
      const newEdittedData = {firstName, lastName, statusBtn, id}
      const index = contactList.findIndex(item => item.id === editedId)
      contactList[index] = newEdittedData

      this.setState(prevesValue => ({
        contactList: [...prevesValue.contactList],
        firstName: '',
        lastName: '',
        statusBtn: 'Inactive',
        isContactBtnActive: true,
        editedContact: false,
        localstorage: true,
      }))
      if (contactList.length < 0) {
        this.setState({dataLength: true})
      }
    }
  }

  onDeleteTrigger = id => {
    const {contactList} = this.state
    const updatedData = contactList.filter(each => each.id !== id)
    this.setState({contactList: updatedData, localstorage: true})
    if (contactList.length === 1) {
      this.setState({dataLength: true})
    }
  }

  onEditTrigger = id => {
    const {contactList} = this.state
    const updatedData = contactList.filter(each => each.id === id)
    this.setState({
      isContactBtnActive: false,
      editedId: id,
      editedContact: true,
      localstorage: true,
      firstName: updatedData[0].firstName,
      lastName: updatedData[0].lastName,
      statusBtn: updatedData[0].statusBtn,
    })
  }

  render() {
    const {
      contactList,
      isContactBtnActive,
      firstName,
      lastName,
      dataLength,
      statusBtn,
      editedContact,
      localstorage,
    } = this.state

    if (localstorage === true) {
      const jsonData = JSON.stringify(contactList)
      localStorage.setItem('Trail', jsonData)
    }
    let show
    console.log(contactList.length)
    if (dataLength === true && contactList.length === 0) {
      show = true
    }
    console.log(contactList)

    return (
      <div className="home-main-bgm">
        <SideBar />
        <div className="right-side-container">
          {isContactBtnActive ? (
            <button
              type="button"
              className="custom-button-crt"
              onClick={this.addingNewContact}
            >
              Create Contact
            </button>
          ) : (
            <form className="form-container" onSubmit={this.userFormDataAdd}>
              <div className="inputs-data-container">
                <div className="individual-inputs-container">
                  <label htmlFor="firstName" className="inputs-content">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={this.getFirstName}
                    className="inputs"
                    placeholder="Enter FirstName"
                  />
                </div>
                <div className="individual-inputs-container">
                  <label htmlFor="lastName" className="inputs-content">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={this.getLastName}
                    className="inputs"
                    placeholder="Enter LastName"
                  />
                </div>
                <div className="individual-inputs-container2">
                  <h3 className="status">Status : </h3>
                  <div className="radio-btn-container">
                    <input
                      type="radio"
                      id="active"
                      name="same"
                      value="Active"
                      onChange={this.updateStatus}
                      checked={statusBtn === 'Active'}
                    />
                    <label htmlFor="active" className="active-label">
                      Active
                    </label>
                  </div>
                  <div className="radio-btn-container">
                    <input
                      type="radio"
                      id="inActive"
                      value="Inactive"
                      onChange={this.updateStatus}
                      name="same"
                      checked={statusBtn === 'Inactive'}
                    />
                    <label htmlFor="inActive" className="active-label">
                      Inactive
                    </label>
                  </div>
                </div>
                <div className="submit-btn-container">
                  {editedContact ? (
                    <button type="submit" className="save-edited-contact-btn">
                      Save Editted Contact
                    </button>
                  ) : (
                    <button type="submit" className="save-contact-btn">
                      Save Contact
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          {show && (
            <div className="no-contacts-time">
              <button type="button" className="cross-btn">
                x
              </button>
              <p className="empty-type-text">
                No Contact Found please add Contact from Create Contact Button
              </p>
            </div>
          )}
          {isContactBtnActive && (
            <ul className="myUnorderList">
              {contactList.map(each => (
                <ContactItems
                  key={each.id}
                  contact={each}
                  onDeleteTrigger={this.onDeleteTrigger}
                  onEditTrigger={this.onEditTrigger}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Contacts
