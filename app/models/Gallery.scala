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
case class Gallery (id: Option[UUID], name: String, desc: String, imgSmallURL: String, imgLargeURL: String)

object Gallery {
  implicit val format: Format[Gallery] = Json.format[Gallery]

  protected val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)
  import dbConfig.driver.api._

  class GalleryTable(tag: Tag) extends GenericTable[Gallery](tag, "gallery") {
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def desc = column[String]("desc")
    def imgSmallURL = column[String]("imgSmallURL")
    def imgLargeURL = column[String]("imgLargeURL")

    def * = (id.?, name, desc, imgSmallURL, imgLargeURL)<>((Gallery.apply _).tupled, Gallery.unapply)
  }

  val table = TableQuery[GalleryTable]
}