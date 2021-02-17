import React, { useRef } from 'react';

function TextAreaModify(props) {
  const onhandlecontext = () => {
    const value = props.contextRef.current.value;
    props.handlecontext(value);
  };
  return (
    <textarea
      className="form__field context"
      ref={props.contextRef}
      placeholder="context"
      id="context"
      type="textarea"
      value={props.initialValue}
      onChange={onhandlecontext}
      required
    />
  );
}

export default TextAreaModify;
