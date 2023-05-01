import { BOX_REPOSITORY } from "src/core/constants";
import { Box } from "./box.entity";

export const boxesProvider = [{
    provide: BOX_REPOSITORY,
    useValue: Box,
}];