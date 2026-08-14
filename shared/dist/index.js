var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Category: () => Category,
  Discount: () => Discount,
  FieldTypes: () => FieldTypes,
  Formula: () => Formula,
  Level: () => Level,
  Role: () => Role,
  SessionDto: () => SessionDto,
  SessionEnum: () => SessionEnum,
  UserDto: () => UserDto,
  UserPayloadDto: () => UserPayloadDto
});
module.exports = __toCommonJS(index_exports);

// src/dto/payload.dto.ts
var UserPayloadDto = class {
};

// src/dto/session.dto.ts
var SessionDto = class {
};

// src/dto/user.dto.ts
var UserDto = class {
};

// src/enums/category.enum.ts
var Category = /* @__PURE__ */ ((Category2) => {
  Category2["Adulte"] = "Adulte";
  Category2["Enfant"] = "Enfant";
  return Category2;
})(Category || {});

// src/enums/discount.enum.ts
var Discount = /* @__PURE__ */ ((Discount2) => {
  Discount2["\xC9tudiant"] = "\xC9tudiant";
  Discount2["Demandeur d'emploi"] = "Demandeur d'emploi";
  Discount2["2e membre d\u2019une m\xEAme famille"] = "2e membre d\u2019une m\xEAme famille";
  Discount2["Pass Sport"] = "Pass Sport";
  return Discount2;
})(Discount || {});

// src/enums/field-types.enum.ts
var FieldTypes = /* @__PURE__ */ ((FieldTypes2) => {
  FieldTypes2["string"] = "string";
  FieldTypes2["number"] = "number";
  FieldTypes2["boolean"] = "boolean";
  FieldTypes2["date"] = "date";
  FieldTypes2["tel"] = "tel";
  FieldTypes2["textarea"] = "textarea";
  FieldTypes2["select"] = "select";
  FieldTypes2["select-multiple"] = "select-multiple";
  FieldTypes2["checkbox"] = "checkbox";
  FieldTypes2["email"] = "email";
  FieldTypes2["password"] = "password";
  return FieldTypes2;
})(FieldTypes || {});

// src/enums/formula.enum.ts
var Formula = /* @__PURE__ */ ((Formula2) => {
  Formula2["Cotisation annuelle (CA)"] = "Cotisation annuelle (CA)";
  Formula2["CA + cours"] = "CA + cours";
  Formula2["Droit de terrain"] = "Droit de terrain";
  Formula2["Cotisation estivale"] = "Cotisation estivale";
  return Formula2;
})(Formula || {});

// src/enums/level.enum.ts
var Level = /* @__PURE__ */ ((Level2) => {
  Level2["Debutant"] = "Debutant";
  Level2["Intermediaire"] = "Intermediaire";
  Level2["Confirme"] = "Confirme";
  return Level2;
})(Level || {});

// src/enums/role.enum.ts
var Role = /* @__PURE__ */ ((Role2) => {
  Role2["ADMIN"] = "ADMIN";
  Role2["USER"] = "USER";
  return Role2;
})(Role || {});

// src/enums/session.enum.ts
var SessionEnum = /* @__PURE__ */ ((SessionEnum2) => {
  SessionEnum2["LUNDI"] = "Lundi 20h - 23h";
  SessionEnum2["MARDI"] = "Mardi 20h - 23h";
  SessionEnum2["JEUDI"] = "Jeudi 20h15 - 23h";
  SessionEnum2["VENDREDI"] = "Vendredi 20h - 23h";
  SessionEnum2["SAMEDI"] = "Samedi 9h - 11h";
  return SessionEnum2;
})(SessionEnum || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Category,
  Discount,
  FieldTypes,
  Formula,
  Level,
  Role,
  SessionDto,
  SessionEnum,
  UserDto,
  UserPayloadDto
});
