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
  import play.api.data.Form
  import play.api.data.Forms._
  implicit val form: Format[Product] = Json.format[Product]
  val formProduct = Form(mapping(
    "id" -> optional(uuid),
    "categoryID" -> uuid,
    "name" -> nonEmptyText,
    "desc" -> text,
    "imgSmallURL" -> text,
    "imgLargeURL" -> text,
    "comments" -> text,
    "feature" -> optional(boolean)
    )(Product.apply)(Product.unapply))

  val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)
  import dbConfig.driver.api._

  class ProductTable(tag: Tag) extends GenericTable[Product](tag, "product"){
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def categoryID = column[UUID]("category_id")
    def name = column[String]("name")
    def desc = column[String]("desc")
    def imgSmallURL = column[String]("img_small_url")
    def imgLargeURL = column[String]("img_large_url")
    def comments = column[String]("comments")
    def feature = column[Boolean]("feature")

    def category = foreignKey("o_category_cproduct", categoryID, Category.table)(_.id)

    def * = (id.?, categoryID, name, desc, imgSmallURL, imgLargeURL, comments, feature.?)<>((Product.apply _).tupled, Product.unapply)
  }
}