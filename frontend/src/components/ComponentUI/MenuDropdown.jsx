import React, { useState, useRef, useEffect } from 'react';
// import { Dropdown } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './MenuDropdown.css';

function MenuDropdown(props) {
  const options = props.postList.map((post) => post.postlistName);
  const defaultOption = options[0];

  const [selectedValue, setSelectedValue] = useState(defaultOption);
  const [memberPostlistId, setMemberPostlistId] = useState(null);

  const handleSelect = (e) => {
    setSelectedValue(() => e.value);
  };

  useEffect(() => {
    const postListObject = props.postList.find(
      (post) => selectedValue && post.postlistName === selectedValue,
    );
    postListObject &&
      setMemberPostlistId(() => postListObject.memberPostlistId);
  }, [selectedValue]);

  useEffect(() => {
    props.handleMemberPostlistId(memberPostlistId);
  }, [memberPostlistId]);

  return (
    <Dropdown
      className="Dropdown-root"
      controlClassName="Dropdown-control"
      placeholderClassName="Dropdown-placeholder"
      // menuClassName="Dropdown-root"
      options={options}
      // onChange={}
      value={defaultOption}
      placeholder="선택"
      onChange={handleSelect}
    />
  );
}

export default MenuDropdown;
