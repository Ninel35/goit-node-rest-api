const contactsService = require("../services/contactsServices.js");

const getAllContacts = async (req, res) => {
  res.send(await contactsService.listContacts());
};

const getOneContact = async (req, res) => {
  const id = req.params.id;
  const contact = await contactsService.getContactById(id);
  if (contact) {
    res.send(await contactsService.getContactById(id));
  } else {
    res.status(404).send({ message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  res.send(await contactsService.removeContact(id));
};

const createContact = async (req, res) => {
  res.status(201).send(await contactsService.addContact(req.body));
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  res.status(201).send(await contactsService.upContact(id, req.body));
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
