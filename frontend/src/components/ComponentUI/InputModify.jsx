import React, { createRef, useState } from 'react';

function InputModify(props) {
  const onhandletitle = () => {
    const value = props.titleRef.current.value;
    props.handletitle(value);
  };
  return (
    <input
      className="form__field context"
      ref={props.titleRef}
      placeholder={props.initialValue}
      id="context"
      type="textarea"
      value={props.initialValue}
      onChange={onhandletitle}
      required
    />
  );
}

export default InputModify;
