import {Level} from "../enums";
import {UserDto} from "./user.dto";

export class SessionDto {
    id?: number;
    name!: string;
    level!: Level;
    hours!: string;
    date!: Date;
    openedBy!: string;
    attendees!: UserDto[];
}