import React,{Component}from 'react';const url='http://127.0.0.1:8000/find_user/';class FindContacts extends Component{constructor(){super();this.state={tag:"",current_state:'czekam na tag'};this.handleChange=this.handleChange.bind(this);this.onClick=this.onClick.bind(this)}
onClick(e){this.setState({current_state:'przetwarzam'});var a=this;fetch(url,{method:'POST',mode:'cors',body:JSON.stringify(this.state),headers:{Accept:'application/json'}}).then(function(response){if(response.status===200){response.json().then(function(json){console.log(json.username,json.screen_name);a.setState({current_state:json.username.length+" osoby pisały na ten temat."})})}else if(response.status===205){a.setState({current_state:"Tag jest pusty"})}else{a.setState({current_state:"Błąd!"})}});e.preventDefault()}
handleChange(e){let target=e.target;let value=target.type==='checkbox'?target.checked:target.value;let name=target.name;this.setState({[name]:value})}
render(){return(<body><p className="margin">Wpisz tag w celu znalezienia liczby odbiorców</p><input placeholder="Wpisz tag" name="tag" value={this.state.tag}onChange={this.handleChange}/><div><button className="FormField__Button mr-20" onClick={this.onClick}>Szukaj Kontaktów</button></div><div className="margin">Status:{this.state.current_state}</div></body>)}}
export default FindContacts