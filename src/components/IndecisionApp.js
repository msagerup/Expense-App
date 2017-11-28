import React from 'react';
import AddOption from './AddOptions';
import Action from './Action';
import Header from './Header';
import Options from './Options';



export default class IndecisionApp extends React.Component {
   state = {
      options: []
   };
      handleDeleteOptions = () => {
      this.setState (() => ({ options: [] }))
   }

  handleDeleteOption = (optionToRemove) => {
   this.setState ((prevState) => ({
      options : prevState.options.filter ((option) => optionToRemove !== option)
   }));
  }

   handlePick = () => {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
   };

   handleAddOption = (option) => {
      if(!option) {
         return 'Please enter a value to add a option!';
      } else if (this.state.options.indexOf(option) > -1) {
         return 'This options already exists';
      }

      this.setState ((prevState) => 
         ({ options: prevState.options.concat(option) 
         }));
      }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }

   componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
         const json = JSON.stringify(this.state.options)
         localStorage.setItem('options', json); 
      }
    }

   componentWillUnmount () {
      console.log('Component unmouted');
   }




      // this.setState((prevState) => {
      //    return {
      //       options: prevState.options.concat(option)
      //    }
      // })
   

   render() {
      const subTitle = 'Put you life in the hands of a computer';
      
      return(
         <div id="container">
            <Header subTitle={subTitle} />
            <Action
            handlePick = {this.handlePick} 
            hasOptions={this.state.options.length > 0}

             />
            <Options 
            options={this.state.options}
            handleDeleteOptions = {this.handleDeleteOptions}
            handleDeleteOption = {this.handleDeleteOption}

            />
            <AddOption 
            handleAddOption = {this.handleAddOption}
            />

         </div>

      );
   }
}


