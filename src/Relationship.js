import React, { Component } from 'react';
import LayoutForm from './LayoutForm'
import mockData from './mockData'

class Relationship extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data:{
        id: 'Relationship',
        title: "Meet the family",
        subTitle: "Search one person and the Relationship, then see the results of the Relationship",
        input:{
          Person: 'Ish',
          Relation: 'Brothers'
        },
        button: 'Search'
      }
    }
    this.getRelative = this.getRelative.bind(this)
  }

  getRelative(person, related, callback){
    let node = this.getNode( person )
    let result = functions[related](node)
    callback(result)
  }

  getNode( person ){
    var newData = null
    mockData.contains(
      function(node){
        if(node.data.name === person)
          newData = node
      } , mockData.traverseDF)
      return newData
    }


  render() {
    return (
      <LayoutForm data={this.state.data} click={this.getRelative}></LayoutForm>
    );
  }
}

export default Relationship;

var functions = {
  brothers: function(node){
    var partentChild = node.parent.children
    let brother = partentChild.filter(child =>  child.data.gender === "M" && child.data !== node.data )
    return brother.map(child => child.data.name + " ")
  },
  sisters: function(node){
    var partentChild = node.parent.children
    let sister = partentChild.filter(child =>  child.data.gender === "F" && child.data !== node.data )
    return sister.map(child => child.data.name + " ")
  },
  mother: function(node){
    if(node.parent.gender === "M")
      return node.parent.marriedWith
    return node.parent.name
  },
  father: function(node){
    if(node.parent.gender === "F")
      return node.parent.marriedWith
    return node.parent.name
  },
  children: function(node){
    if(node.children)
      return node.children.map(child => child.data.name + " ")
  },
  son: function(node){
    let children = node.children.filter(child => child.data.gender === "M")
    return children.map(child => child.data.name + " ")
  },
  daughter: function(node){
    let children = node.children.filter(child => child.data.gender === "F")
    return children.map(child => child.data.name + " ")
  },
  'paternal uncle': function(node){
    if( node.parent ){
      let father = node.parent
      return functions.brothers(father)
    }
  },
  'maternal uncle': function(node){
    let father = node.parent
    return functions.brothers(father)
  },
  'paternal aunt':function(node){
    if(node.parent){
      let father = node.parent
      return functions.sisters(father)
    }
  },
  'maternal aunt': function(node){
    let father = node.parent
    return functions.sisters(father)
  },
  uncles: function(node){
    let father = node.parent
    return functions.brothersAndSisters(father)
  },
  brothersAndSisters: function(node){
    let brothers = node.parent.children.filter(child => child.data !== node.data )
    return brothers
  },
  cousins: function(node){
    var uncles = functions.uncles(node)
    var cusins = uncles.filter( uncle => functions.children(uncle) )
    return functions.stringFY(cusins)
  },
  'grand daughter': function(node){
    var children = node.children
    var childrenDaughter = children.map(child => functions.daughter(child))
    return functions.stringFY(childrenDaughter)
  },
  stringFY: function(arr){
    var string = ''
    for(var i =0; i<arr.length; i++){
      if(arr[i].length > 0 )
        string += arr[i][0] + ','
    }
    return string
    }
}

