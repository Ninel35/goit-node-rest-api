import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  upContact,
} from "../services/contactsServices.js";

import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    // res.send(await listContacts());
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const contact = await getContactById(id);
    const contact = await Contact.findById(id);
    // if (contact === null) {
    //   res.status(404).send("Not found");
    // }
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await removeContact(id);
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  try {
    // res.status(201).send(await addContact(req.body));
    const result = await Contact.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await upContact(id, req.body);
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.status(201).send(contact);
  } catch (error) {
    next(error);
  }
};
