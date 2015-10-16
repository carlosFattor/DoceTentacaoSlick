package models.DAOs

import javax.inject.Inject
import models.Product
import models.Product.ProductTable
import play.api.db.slick.DatabaseConfigProvider
import slick.lifted.TableQuery

/**
 * Created by carlos on 15/10/15.
 */
class ProductDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[ProductTable, Product]{

  override val table = TableQuery[ProductTable]
}
