function CheckBox() {
  return (
    <div className="checkbox">
      <input type="checkbox" value="Rm" id="rememberMe" name="rememberMe" />
      <label>
        <b className="m-2">Remember Me</b>
      </label>
    </div>
  );
}

export default CheckBox;
