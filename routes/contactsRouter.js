import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../helpers/validateBody.js";

import isValidId from "../helpers/isvalidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  isValidId,
  updateContact
);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateStatusSchema),
  isValidId,
  updateStatusContact
);

export default contactsRouter;
