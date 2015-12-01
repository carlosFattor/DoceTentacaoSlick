package models.DAOs

import java.util.UUID
import javax.inject.Inject
import models.Product
import models.Product.ProductTable
import play.api.Logger
import play.api.db.slick.DatabaseConfigProvider
import slick.lifted.TableQuery
import scala.concurrent.Future
import slick.driver.PostgresDriver.api._
import scala.concurrent.ExecutionContext.Implicits._

/**
 * Created by carlos on 15/10/15.
 */
class ProductDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends GenericCRUD[ProductTable, Product]{
  override val table = TableQuery[ProductTable]


  private val queryByCategoryID =Compiled((id: Rep[UUID]) => table.filter(_.id === id).length)

  def listFeatured(): Future[Seq[Product]] = {
    val queryByFeatured = table.filter(_.feature === true).result
    Logger.info(s"Query listFeatured: ${queryByFeatured.statements}")

    db.run(queryByFeatured).map(_.toList)
  }

  def findByIdCategory(id: UUID): Future[Seq[Product]] = {
    val queryByCategory = table.filter(_.categoryID === id).result
    Logger.info(s"Query listByIdCategory: ${queryByCategory.statements}")

    db.run(queryByCategory).map(_.toList)
  }

  def findByName(name: String):Future[Option[Product]] = {
    val queryByName = for {
      prod <- table if fulltextMatch(prod.name, name)
    } yield prod
    Logger.info(s"Query findByEmail: ${queryByName.result.statements}")

    db.run(queryByName.result.headOption)
  }

  def findListByName(name: String): Future[Seq[Product]] = {
    val queryByName = for {
      prod <- table if prod.name.toLowerCase like s"%$name%"
    } yield prod
    Logger.info(s"Query findByEmail: ${queryByName.result.statements}")

    db.run(queryByName.result)
  }
  def countByIDCategory(id: UUID): Future[Int] = {
    db.run(queryByCategoryID(id).result)
  }

}
