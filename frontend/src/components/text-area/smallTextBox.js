function SmallTextBox(props) {
  return (
    <div className="mt-2">
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
