import "reflect-metadata";
import { AdminModule } from "@/modules/AdminModule";
import { container } from "tsyringe";

const ServerContainer = container.createChildContainer();

export const adminModule = ServerContainer.resolve(AdminModule);
