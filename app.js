import React, { Component } from 'react'
import {
  Autocomplete,
  Paper,
  TextField,
  Button,
  DialogContainer
} from 'react-md'
import StateChip from './StateChip'
import { uniqBy } from 'lodash/array'
import Image from './image/avatarCompany.png'
import states from './sampleData/states'

export default class MapData extends Component {
  constructor (props) {
    super(props)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.state = {
      selectedStates: [],
      filteredStates: states,
      showNewPositionDialogue: false,
      position: 'Electrical Engineer',
      company: 'Target Energy Solutions',
      posted: '10:45 am 01/01/2018',
      deadline: '01/03/2018',
      Required: 'Graduate',
      career: 'Professional',
      experience: '5 years',
      salary: '***-*** OMR',
      languages: 'Arabic, English',
      location: 'Muscat, Oman',
      description:
        'Electrical engineers are responsible for implementing and designing components for any device that uses electricity, as well as the devices themselves. Engineers have to focus on the generation of power to the device or product. These devices can include anything that runs on electricity. Electrical engineers also focus on researching, creating, and im-proving products and devices.'
    }
  }
  show () {
    this.setState({ showNewPositionDialogue: true })
  }
  hide () {
    this.setState({ showNewPositionDialogue: false })
  }
  setNextState = selectedStates => {
    this.setState({
      selectedStates,
      filteredStates: states.filter(
        state => selectedStates.indexOf(state) === -1
      )
    })
  }

  addState = (abbreviation, index, matches) => {
    const state = matches[index]
    const selectedStates = uniqBy(
      [...this.state.selectedStates, state],
      s => s.name
    )
    this.setNextState(selectedStates)
  }

  removeState = state => {
    const selectedStates = this.state.selectedStates.slice()
    selectedStates.splice(selectedStates.indexOf(state), 1)
    this.setNextState(selectedStates)
  }
  render () {
    const { item } = this.props
    const {
      showNewPositionDialogue,
      position,
      company,
      posted,
      deadline,
      Required,
      career,
      experience,
      salary,
      languages,
      location,
      description
    } = this.state
    const actions = []
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide })
    actions.push(
      <Button flat primary onClick={this.sendData}>
        Confirm
      </Button>
    )
    const { selectedStates, filteredStates } = this.state
    const chips = selectedStates.map(state => (
      <StateChip
        key={state.abbreviation}
        state={state}
        onClick={this.removeState}
      />
    ))
    return (
      <div className="cellItem">
        <DialogContainer
          id="simple-action-dialog"
          onHide={this.hide}
          actions={actions}
          title="Details Position"
          modal={true}
          visible={showNewPositionDialogue}
          width={1000}
        >
          <div className="md-grid">
            <div className="md-cell md-cell--6">
              <TextField
                label="Position"
                id="autoresizing-3"
                placeholder="Position"
                value={position}
              />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Company"
                id="autoresizing-3"
                placeholder="Position"
                value={company}
              />
            </div>

            <div className="md-cell md-cell--6">
              <TextField label="Posted on" id="autoresizing-3" value={posted} />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Deadline to apply "
                id="autoresizing-3"
                value={deadline}
              />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Required Degree "
                id="autoresizing-3"
                value={Required}
              />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Career Level "
                id="autoresizing-3"
                value={career}
              />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Min Experiencee"
                id="autoresizing-3"
                value={experience}
              />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Salary Range"
                id="autoresizing-3"
                value={salary}
              />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Salary Range"
                id="autoresizing-3"
                value={languages}
              />
            </div>
            <div className="md-cell md-cell--6">
              <TextField
                label="Location"
                id="autoresizing-3"
                value={location}
              />
            </div>
            <div className="md-cell md-cell--12">
              <TextField
                label="Job Description"
                id="autoresizing-3"
                value={description}
              />
              {chips}
              <Autocomplete
                id="states-autocomplete"
                label="Select some states"
                data={filteredStates}
                dataLabel="name"
                dataValue="abbreviation"
                onAutocomplete={this.addState}
                clearOnAutocomplete
                deleteKeys="abbreviation"
              />
            </div>
          </div>
        </DialogContainer>
        <Paper zDepth={2} className="ItemCardViewGrid">
          <div className="ItemCardViewGrid__Icon">
            <img src={Image} />
          </div>
          <div className="ItemCardViewGrid__Info" onClick={this.show}>
            <h3 className="ItemCardViewGrid__Title">{item.title}</h3>
            <span className="ItemCardViewGrid__Company">{item.company}</span>
            <br />
            <span className="ItemCardViewGrid__CompanyIndustry">
              {item.industry}
            </span>
            <br />
            <span className="ItemCardViewGrid__CompanyLocation">
              {item.location}
            </span>
            <span className="ItemCardViewGrid__CompanyLocation">
              <p>{item.published_on}</p>
            </span>
          </div>
        </Paper>
      </div>
    )
  }
}

