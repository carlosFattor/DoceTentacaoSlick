package models.DAOs

import javax.inject.Inject

import models.Contact
import models.Contact.ContactTable
import play.api.db.slick.DatabaseConfigProvider
import slick.lifted.TableQuery

/**
 * Created by carlos on 15/10/15.
 */
class ContactDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[ContactTable, Contact]{

  override val table = TableQuery[ContactTable]
}
