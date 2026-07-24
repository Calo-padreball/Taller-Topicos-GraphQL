import { registerEnumType } from "@nestjs/graphql";

export enum EstadosTask {
    BACKLOG = 'Backlog',
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done',
}

registerEnumType(EstadosTask, {
    name: 'EstadosTask',
    description: 'Estados posibles',
});