import { useState } from "react";
import "../styles/tags.scss";
import React from "react";

function TagsInput(props) {
  const [tags, setTags] = useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    const newTag = event.target.value.trim().toLowerCase();
    if (newTag !== "") {
      console.log(newTag);
      setTags([...tags, newTag]);
      props.selectedTags([...tags, newTag]);
      event.target.value = "";
    }
  };
  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.keyCode === 32 ? addTags(event) : null)}
        placeholder="Space bar to add tags"
      />
    </div>
  );
}

export default TagsInput;
