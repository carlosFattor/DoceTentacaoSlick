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
case class Gallery(id: Option[UUID],
                   name: String,
                   desc: String,
                   imgSmallURL: String,
                   imgLargeURL: String)

object Gallery {

  import play.api.data.Form
  import play.api.data.Forms._

  implicit val format: Format[Gallery] = Json.format[Gallery]
  val formGallery = Form(mapping(
    "id" -> optional(uuid),
    "name" -> nonEmptyText,
    "desc" -> text,
    "imgSmallURL" -> nonEmptyText,
    "imgLargeURL" -> nonEmptyText
  )(Gallery.apply)(Gallery.unapply))

  protected val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)

  import dbConfig.driver.api._

  class GalleryTable(tag: Tag) extends GenericTable[Gallery](tag, "gallery") {
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def desc = column[String]("desc")

    def imgSmallURL = column[String]("img_small_url")

    def imgLargeURL = column[String]("img_large_url")

    def * = (id.?, name, desc, imgSmallURL, imgLargeURL) <>((Gallery.apply _).tupled, Gallery.unapply)
  }

  val table = TableQuery[GalleryTable]
}