import HttpError from "../helpers/HttpError.js";

import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id);
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
    const contact = await Contact.findByIdAndDelete(id);
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
    const result = await Contact.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.status(201).send(contact);
  } catch (error) {
    next(error);
  }
};
export const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};
