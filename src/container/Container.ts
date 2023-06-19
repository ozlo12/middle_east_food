import "reflect-metadata";
import { container } from "tsyringe";

import {
  AuthProviderService,
  LocalAuthProviderService,
} from "@services/auth-provider.service";

const customContainer = container.createChildContainer();

customContainer.register("AuthProvider", {
  useClass: LocalAuthProviderService,
});

export { customContainer as Container };
