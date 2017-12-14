import React from 'react';

const EditExpensePage = (props) => {
	console.log(props)
	return (
  <div>
   Editing the expence with id of : {props.match.params.id}
  </div>
);
};

export default EditExpensePage;
