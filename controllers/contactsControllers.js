const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");

const getAllContacts = async (req, res) => {
  res.send(await contactsService.listContacts());
};

const getOneContact = async (req, res) => {
  const id = req.params.id;
  res.send(await contactsService.getContactById(id));
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  res.send(await contactsService.removeContact(id));
};

const createContact = async (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const { value, error } = createContactSchema.validate(contact);
  if (typeof error !== "undefined") {
    return res.status(400).send("Validator Error");
  }

  res.status(201).send(await contactsService.addContact(value));
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  const contact = {};
  for (const property in req.body) {
    contact[property] = req.body[property];
  }
  const { value, error } = updateContactSchema.validate(contact);
  if (typeof error !== "undefined") {
    return res.status(400).send("Validator Error");
  }

  res.status(201).send(await contactsService.upContact(id, value));
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
