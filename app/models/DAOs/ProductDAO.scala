package models.DAOs

import java.util.UUID
import javax.inject.Inject
import models.Product
import models.Product.ProductTable
import play.api.db.slick.DatabaseConfigProvider
import slick.lifted.TableQuery
import scala.concurrent.Future
import slick.driver.PostgresDriver.api._


/**
 * Created by carlos on 15/10/15.
 */
class ProductDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[ProductTable, Product]{
  override val table = TableQuery[ProductTable]


  val queryByCategoryID =Compiled((id: Rep[UUID]) => table.filter(_.id === id).length)

  def findByEmail(email: String):Future[Option[Product]] = {
    val queryByEmail = for {
      prod <- table if fulltextMatch(prod.name, email)
    } yield prod

    db.run(queryByEmail.result.headOption)
  }
  def countByIDCategory(id: UUID): Future[Int] = {
    db.run(queryByCategoryID(id).result)
  }

}
