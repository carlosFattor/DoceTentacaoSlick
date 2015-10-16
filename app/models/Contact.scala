package models

import java.util.UUID

import models.DAOs.GenericTable
import org.joda.time.DateTime
import play.api.Play
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.{Json, Format}
import utils.SlickMapping.jodaDateTimeMapping
import slick.driver.JdbcProfile

/**
 * Created by carlos on 14/10/15.
 */
case class Contact (id: Option[UUID],
                    name: String,
                    email: String,
                    website: Option[String] = Option(" "),
                    textEmail: String,
                    data: Option[DateTime] = Option(new DateTime()),
                    sent: Option[Boolean] = Option(false))

object Contact {
  implicit val format: Format[Contact] = Json.format[Contact]

  protected val dbConfig = DatabaseConfigProvider.get[JdbcProfile](Play.current)
  import dbConfig.driver.api._

  class ContactTable(tag: Tag) extends GenericTable[Contact](tag, "contact") {
    override def id = column[UUID]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def email = column[String]("email")
    def website = column[String]("web_site")
    def textEmail = column[String]("text_email")
    def data = column[DateTime]("data")
    def sent = column[Boolean]("sent")

    def * = (id.?, name, email, website.?, textEmail, data.?, sent.?)<>((Contact.apply _).tupled, Contact.unapply)
  }
  val table = TableQuery[ContactTable]
}