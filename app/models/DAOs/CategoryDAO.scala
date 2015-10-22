package models.DAOs

import javax.inject.Inject

import models.Category
import models.Category.CategoryTable
import play.api.db.slick.DatabaseConfigProvider
import slick.lifted.TableQuery

/**
 * Created by carlos on 15/10/15.
 */
class CategoryDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[CategoryTable, Category]{

  override val table = TableQuery[CategoryTable]

}
