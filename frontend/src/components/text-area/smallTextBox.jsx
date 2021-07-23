function SmallTextBox(props) {
  return (
    <div className="form-grsTextBoxoup">
      <label>{props.label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.callBack}
      />
    </div>
  );
}

export default SmallTextBox;
