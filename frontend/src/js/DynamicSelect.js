import React,{Component}from 'react';class DynamicSelect extends Component{constructor(props){super(props)}
handleChange=(event)=>{let selectedValue=event.target.value;let selectedId=event.target.key;this.props.onSelectChange(selectedValue)};render(){let arrayOfData=this.props.arrayOfData;let options=arrayOfData.map((data)=><option
key={data.id}
value={data.id}>{data.name}</option>);return(<select name="customSearch" className="custom-search-select" onChange={this.handleChange}>{options}</select>)}}
export default DynamicSelect