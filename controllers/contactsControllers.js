const HttpError = require("../helpers/HttpError.js");
const contactsService = require("../services/contactsServices.js");

const getAllContacts = async (req, res) => {
  res.send(await contactsService.listContacts());
};

const getOneContact = async (req, res) => {
  const id = req.params.id;
  const contact = await contactsService.getContactById(id);
  if (contact) {
    res.send(contact);
  } else {
    res.status(404).send(HttpError(404).message);
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  const contact = await contactsService.removeContact(id);
  if (contact) {
    res.send(contact);
  } else {
    res.status(404).send(HttpError(404).message);
  }
};

const createContact = async (req, res) => {
  res.status(201).send(await contactsService.addContact(req.body));
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  const contact = await contactsService.upContact(id, req.body);
  if (contact) {
    res.status(201).send(contact);
  } else {
    res.status(404).send(HttpError(404).message);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
