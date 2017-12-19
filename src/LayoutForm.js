import React, { Component } from 'react';

class LayoutForm extends Component {
   constructor(props) {
    super(props)
    this.state = {
      dataResult: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.showResult =this.showResult.bind(this)
  }

  getRows(input){
    var rows = []
    for (var data in input){
      rows.push(<input id={data} placeholder={input[data]} />);
    }
    return rows
  }
  handleClick(){
    let newData = this.getFormData()
    if(this.isValidData(newData) )
      this.props.click(newData[0].value, newData[1].value, this.showResult)
  }
  showResult(data){
    this.setState({dataResult: data})
  }
  getFormData(){
    return [].slice.call(document.querySelectorAll("#"+this.props.data.id +" input") )// for transform node list to Array
  }

  isValidData(newData){
    return newData.every(data => !!data.value)
  }
  getResult(){
      return (<span>{this.state.dataResult}</span>)
  }

  render() {
    var data = this.props.data
    return (
      <div>
        <h2>{data.title}</h2>
        <span>{data.subTitle}</span>
        <div id={data.id}>
          {this.getRows(data.input) }
          <button onClick={this.handleClick}>{data.button}</button>
        </div>
       { this.state.dataResult? this.getResult(): null}


      </div>
    );
  }
}

export default LayoutForm;