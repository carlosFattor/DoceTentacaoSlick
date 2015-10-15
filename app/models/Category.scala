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
case class Category (id: Option[UUID],
                     name: String,
                     url: String,
                     desc: String)

object Category {
  implicit val form: Format[Category] = Json.format[Category]

  val dbConfig =  DatabaseConfigProvider.get[JdbcProfile](Play.current)
  import dbConfig.driver.api._

  class CategoryTable(tag: Tag) extends GenericTable[Category](tag, "Category"){
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def url = column[String]("url")
    def desc = column[String]("desc")

    def * = (id.?, name, url, desc)<>((Category.apply _).tupled, Category.unapply)
  }

  val table = TableQuery[CategoryTable]
}