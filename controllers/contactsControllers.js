const HttpError = require("../helpers/HttpError.js");
const contactsService = require("../services/contactsServices.js");

const getAllContacts = async (req, res, next) => {
  try {
    res.send(await contactsService.listContacts());
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res) => {
  try {
    res.status(201).send(await contactsService.addContact(req.body));
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await contactsService.upContact(id, req.body);
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.status(201).send(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
