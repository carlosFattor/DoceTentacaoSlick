package models.DAOs

import javax.inject.Inject

import models.EmailNews
import models.EmailNews.EmailNewsTable
import play.api.db.slick.DatabaseConfigProvider
import slick.lifted.TableQuery

/**
 * Created by carlos on 15/10/15.
 */
class EmailNewsDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[EmailNewsTable, EmailNews]{

  override val table = TableQuery[EmailNewsTable]
}
