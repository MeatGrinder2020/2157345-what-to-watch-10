import React, { SyntheticEvent } from 'react';

type StarProp ={
  value: number,
  readonly checked: boolean,
  changeFormRating: (event: SyntheticEvent) => void
}

function Star({value, changeFormRating, checked}: StarProp):JSX.Element {
  return (
    <React.Fragment>
      <input className="rating__input" id={`star-${value}`} type="radio" name="rating" value={value} defaultChecked={checked} onClick={changeFormRating}/>
      <label className="rating__label" htmlFor={`star-${value}`} >{`Rating ${value}`}</label>
    </React.Fragment>
  );
}
export default Star;
