function TextBox(props) {
  return (
    <div className="form-group ">
      {props.label ? (
        <label>
          <h3>{props.label}</h3>
        </label>
      ) : (
        <></>
      )}

      <textarea
        type="password"
        className="form-control"
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.callBack}
        rows={props.rows}
        style={props.style}
      ></textarea>
    </div>
  );
}

export default TextBox;
