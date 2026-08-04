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

export { Category, Discount, FieldTypes, Formula, Level, Role, SessionEnum };
