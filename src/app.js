

class IndecisionApp extends React.Component {
   constructor(props) {
      super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
      this.state = {
         options: props.options
      }
   }
  
   handleDeleteOptions() {
      this.setState (() => ({ options: [] }))
   }

   

  handleDeleteOption (option) {
   console.log('hello', option)
  }




   handlePick() {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
   };



   handleAddOption(option) {
      if(!option) {
         return 'Please enter a value to add a option!';
      } else if (this.state.options.indexOf(option) > -1) {
         return 'This options already exists';
      }

      this.setState ((prevState) => 
         ({ options: prevState.options.concat(option) 
         }));
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

IndecisionApp.defaultProps = {
   options: []
}


const Header = (props) => {
    return (
         <div>
            <h1>{props.title}</h1>
          {props.subTitle && <h2>{props.subTitle}</h2>}
         </div>
   );
};

Header.defaultProps = {
   title: 'Indecision'

}



// class Header extends React.Component {
//    render() {
      
//       return (
//          <div>
//             <h1>{this.props.title}</h1>
//             <h2>{this.props.subTitle}</h2>
//          </div>

//       );
//    }
// }

const Action = (props) => {
     return (
      <div>
         <button onClick={props.handlePick}
         disabled={!props.hasOptions}
         >
         What should I do?
         </button>
      </div>
   );
}



// class Action extends React.Component {
   
//    render() {
//       return (
//          <div>
//             <button onClick={this.props.handlePick}
//             disabled={!this.props.hasOptions}
//             >
//             What should I do?
//             </button>
//          </div>

//       );
//    }
// }


const Options = (props) => {
   return (
         <div>
           <button onClick={props.handleDeleteOptions}>Remove All</button>
            {
               props.options.map((option) => (
                  <Option key={option} 
                  optionText={option}
                  handleDeleteOption = {props.handleDeleteOption}

                  />
               ))
            }
          </div>        
      );
}


// class Options extends React.Component {

//    render() {
//       return (
//          <div>
//            <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//             {
//                this.props.options.map((option) => <Option key={option} optionText={option}/>)
//             }

          
//           </div>
         
//       );
//    }
// }

const Option = (props) => {
   return (
         <div>
            {props.optionText}  
            <button 
            onClick={(e) => {
               props.handleDeleteOption(props.optionText);
            }}
            >Remove
            </button>
         </div>
      );
}


// class Option extends React.Component {
//    render() {
//       return (
//          <div>
//             {this.props.optionText}  
//          </div>
//       );
//    }
// }

class AddOption extends React.Component {
   constructor (props) {
      super(props)
      this.handleAddOption = this.handleAddOption.bind(this);
      this.state = {
         error: undefined
      }

   }
   handleAddOption(e) {
      e.preventDefault();

      const option = e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(option);

      this.setState (() => ({ error: error }));
   }

   render() {
      return (
         <div>
         {this.state.error && <p>{this.state.error}</p>}
           <form onSubmit={this.handleAddOption}>
               <input type="text" name="option"/>
               <button>Add Option</button>
           </form>
         </div>
         
      );
   }
}




// const User = (props) => {
//    return (
//       <div>
//          <p>Name: {props.name}</p>
//          <p>Age: </p>
//       </div>
//       );
// };


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

