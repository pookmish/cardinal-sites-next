class RedirectError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
export default RedirectError;