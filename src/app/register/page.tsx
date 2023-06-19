import RegisterForm from "@components/auth/RegisterForm";
import { Container } from "../../container/Container";
import { AuthEmailService } from "@services/auth-email.service";

const authService = Container.resolve(AuthEmailService);
export default function Register() {
  return <RegisterForm />;
}
