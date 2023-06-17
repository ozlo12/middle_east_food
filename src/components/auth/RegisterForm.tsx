import Link from "next/link";

export default function RegisterForm() {
  return (
    <form style={{ maxWidth: "570px" }} className="mx-auto">
      <div className="border-1 rounded-4 bg-white p-4">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingName"
            placeholder="Your Name"
          />
          <label htmlFor="floatingName">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            id="floatingPhone"
            placeholder="Your Name"
          />
          <label htmlFor="floatingPhone">Phone Number</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder="ConfirmPassword"
          />
          <label htmlFor="floatingConfirmPassword">Confirm Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="floatingAddress"
            placeholder="Your Address"
          />
          <label htmlFor="floatingName">Address</label>
        </div>
        <div className="d-flex justify-content-between">
          <Link href="/login">Have account already?</Link>
          <div>
            <button className="btn btn-warning me-4">Rest</button>
            <button className="btn btn-primary">Regsiter</button>
          </div>
        </div>
      </div>
    </form>
  );
}
