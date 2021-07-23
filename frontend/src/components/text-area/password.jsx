function Password(props) {
  return (
    <div className="form-group ">
      <label>{props.label}</label>
      <input
        type="password"
        className="form-control"
        placeholder={props.placeHolder}
        value={props.value}
        onChange={props.callBack}
      />
    </div>
  );
}

export default Password;
