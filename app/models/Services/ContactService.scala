package models.Services

import java.util.UUID
import javax.inject.Inject

import models.Contact
import models.DAOs.ContactDAO

import scala.concurrent.Future

/**
 * Created by carlos on 16/11/15.
 */
class ContactService @Inject()(contactDAO: ContactDAO){

  def addContact(contact: Contact): Future[UUID] = {
    contactDAO.insert(contact)
  }

  def listContact(): Future[Seq[Contact]] = {
    contactDAO.list
  }
}
