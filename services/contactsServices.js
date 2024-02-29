import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

export function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

export async function getContactById(contactId) {
  const contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

export async function addContact({ name, email, phone }) {
  const contacts = await readContacts();
  const contact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(contact);

  await writeContacts(contacts);

  return contact;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId) || null;

  await writeContacts(contacts.filter((contact) => contact.id !== contactId));

  return contact;
}

export async function upContact(contactId, data) {
  const contacts = await readContacts();
  let contact = null;
  const updateContacts = contacts.map((el) => {
    if (el.id === contactId) {
      contact = { ...el, ...data };
      return contact;
    }
    return el;
  });
  await writeContacts(updateContacts);

  return contact;
}
