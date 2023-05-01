import { VISIT_REPOSITORY } from "src/core/constants";
import { Visit } from "./visit.enity";

export const visitsProvider = [{
    provide: VISIT_REPOSITORY,
    useValue: Visit,
}];