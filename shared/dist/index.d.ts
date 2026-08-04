declare enum Category {
    'Adulte' = "Adulte",
    'Enfant' = "Enfant"
}

declare enum Discount {
    'Étudiant' = "\u00C9tudiant",
    "Demandeur d'emploi" = "Demandeur d'emploi",
    "2e membre d’une même famille" = "2e membre d\u2019une m\u00EAme famille",
    'Pass Sport' = "Pass Sport"
}

declare enum FieldTypes {
    'string' = "string",
    'number' = "number",
    'boolean' = "boolean",
    'date' = "date",
    'tel' = "tel",
    'textarea' = "textarea",
    'select' = "select",
    'select-multiple' = "select-multiple",
    'checkbox' = "checkbox",
    'email' = "email"
}

declare enum Formula {
    'Cotisation annuelle (CA)' = "Cotisation annuelle (CA)",
    'CA + cours' = "CA + cours",
    'Droit de terrain' = "Droit de terrain",
    'Cotisation estivale' = "Cotisation estivale"
}

declare enum Level {
    'Debutant' = "Debutant",
    'Intermediaire' = "Intermediaire",
    'Confirme' = "Confirme"
}

declare enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

declare enum SessionEnum {
    LUNDI = "Lundi 20h - 23h",
    MARDI = "Mardi 20h - 23h",
    JEUDI = "Jeudi 20h15 - 23h",
    VENDREDI = "Vendredi 20h - 23h",
    SAMEDI = "Samedi 9h - 11h"
}

declare class UserPayloadDto {
    sub: number;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
}

declare class UserDto {
    readonly id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    licenceNumber: string;
    city: string;
    email: string;
    phoneNumber: string;
    category: Category;
    session: SessionEnum[];
    formula: Formula;
    discount: Discount;
    level: Level;
    comment: string;
    avatar: string;
}

declare class SessionDto {
    id?: number;
    name: string;
    level: Level;
    hours: string;
    date: Date;
    openedBy: string;
    attendees: UserDto[];
}

export { Category, Discount, FieldTypes, Formula, Level, Role, SessionDto, SessionEnum, UserDto, UserPayloadDto };
