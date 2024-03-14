import HttpError from "../helpers/HttpError.js";

import Contact from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id });
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { id: owner } = req.user;
    const contact = await Contact.findOne({ _id: id, owner });
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

    const { id: owner } = req.user;

    const contact = await Contact.findOneAndDelete({ _id: id, owner });

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

    const { id: owner } = req.user;

    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      {
        new: true,
      }
    );
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
    const { id: owner } = req.user;

    const { favorite } = req.body;
    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      { favorite },
      {
        new: true,
      }
    );
    if (!contact) {
      next(HttpError(404));
      return;
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};
