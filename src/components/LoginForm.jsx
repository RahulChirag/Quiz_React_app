function LoginForm() {
  return (
    <form>
      <label htmlFor="username-email">Username/Email:</label>
      <input type="email" />
      <label htmlFor="password">Password</label>
      <input type="password" />
      <input type="submit" value="Submit" />
    </form>
  );
}
export default LoginForm;
