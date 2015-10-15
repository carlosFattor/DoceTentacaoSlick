package models.DAOs

import java.util.UUID

import org.joda.time.DateTime
import play.api.Play
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.{Json, Format}
import slick.driver.JdbcProfile
import utils.SlickMapping.jodaDateTimeMapping

/**
 * Created by carlos on 14/10/15.
 */
case class EmailNews (id: Option[UUID], email: String, data: DateTime)

object EmailNews {
  implicit val format: Format[EmailNews] = Json.format[EmailNews]

  protected val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)
  import dbConfig.driver.api._

  class EmailNewsTable(tag: Tag) extends GenericTable[EmailNews](tag, "email_news") {
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def email = column[String]("email")
    def data = column[DateTime]("data")

    def * = (id.?, email, data)<>((EmailNews.apply _).tupled, EmailNews.unapply)
  }
}