package models

import java.util.UUID

import models.DAOs.GenericTable
import play.api.Play
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.{Json, Format}
import slick.driver.JdbcProfile

/**
 * Created by carlos on 14/10/15.
 */
case class Product (id: Option[UUID],
                    categoryID: UUID,
                    name: String,
                    desc: String,
                    imgSmallURL: String,
                    imgLargeURL: String,
                    comments: String,
                    feature: Option[Boolean] = Option(false))

object Product {
  implicit val form: Format[Product] = Json.format[Product]

  val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)
  import dbConfig.driver.api._

  class ProductTable(tag: Tag) extends GenericTable[Product](tag, "product"){
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def categoryID = column[UUID]("categoryID")
    def name = column[String]("name")
    def desc = column[String]("name")
    def imgSmallURL = column[String]("imgSmallURL")
    def imgLargeURL = column[String]("imgLargeURL")
    def comments = column[String]("comments")
    def feature = column[Boolean]("feature")

    def category = foreignKey("o_category_cproduct", categoryID, Category.table)(_.id)

    def * = (id.?, categoryID, name, desc, imgSmallURL, imgLargeURL, comments, feature.?)<>((Product.apply _).tupled, Product.unapply)
  }

  val table = TableQuery[ProductTable]
}