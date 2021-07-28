import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

function Password(props) {
  return (
    <div className="mt-3">
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
