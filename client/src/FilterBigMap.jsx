import React from 'react';

class BigMapFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentValue: 'View All Categories'};
  }

  componentWillMount() {
    this.setState({currentValue: this.props.initValue});
  }

  handleStateChange (event) {
    this.setState({currentValue: event.target.value});
  }

  render() {
    let locNames = {};
    
    locNames['View All Categories'] = 'default';
    (this.props.coordObjs.length > 1) ? this.props.coordObjs.forEach((value, i) => {
      locNames[value.category] = i;
    }) : console.log('Waiting to get data');
    return (
      <div className="big-map-filter">
        <select name='categories' className="ui fluid dropdown" multiple="" id="filter-button"value={this.props.initValue} onChange={this.props.handleChangeFilter}>
          {Object.keys(locNames).map((value, i) => { return (this.props.initValue !== value) ? <option key={i} value={value}>{value}</option> : <option key={i} value={value} selected  >{value}</option>})}
        </select>
      </div>
    );
  }
}

export default BigMapFilter;